import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { cloneWebsiteUrl } from './cloner/engine.js';
import { createCloneZip, generateTailwindV4, generateTailwindV3, generateCssVariables } from './cloner/packager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// In-memory cache for fast previews and downloads (survives requests)
const cloneStore = new Map();

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Zippix Web Cloner Engine', version: '1.0.0' });
});

// Single Clone Endpoint
app.post('/api/clone', async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid website URL.' });
  }

  console.log(`[Zippix Web] Starting clone for: ${url}`);
  const startTime = Date.now();

  try {
    // 1. Run cloner engine
    const result = await cloneWebsiteUrl(url, (prog) => {
      console.log(`[Step ${prog.step}/5] ${prog.message} (${prog.progress}%)`);
    });

    // 2. Generate ZIP
    const zipBuffer = await createCloneZip({
      domain: result.domain,
      title: result.title,
      html: result.html,
      tokens: result.tokens,
      assets: result.assets,
    });

    const cloneId = crypto.randomUUID();

    // 3. Cache clone in memory
    cloneStore.set(cloneId, {
      ...result,
      zipBuffer,
      createdAt: Date.now(),
    });

    // Auto-prune old clones after 2 hours to prevent memory bloat
    setTimeout(() => {
      cloneStore.delete(cloneId);
    }, 2 * 60 * 60 * 1000);

    const safeDomain = result.domain.replace(/[^a-z0-9_-]/gi, '-');

    res.json({
      success: true,
      cloneId,
      domain: result.domain,
      title: result.title,
      url: result.url,
      html: result.html,
      tokens: result.tokens,
      assets: result.assets,
      tailwindV4: generateTailwindV4(result.tokens),
      tailwindV3: generateTailwindV3(result.tokens),
      cssVariables: generateCssVariables(result.tokens),
      previewUrl: `/api/preview/${cloneId}`,
      downloadUrl: `/api/download/${cloneId}`,
      filename: `${safeDomain}.full-page.Zippix.zip`,
      elapsedMs: Date.now() - startTime,
    });
  } catch (err) {
    console.error('[Zippix Web] Cloner Error:', err);
    res.status(500).json({
      error: err.message || 'Failed to clone website. Please check the URL and try again.',
    });
  }
});

// Live Preview endpoint for iframe rendering
app.get('/api/preview/:cloneId', (req, res) => {
  const { cloneId } = req.params;
  const clone = cloneStore.get(cloneId);

  if (!clone) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <body style="background:#141413;color:#faf9f5;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;">
          <div style="text-align:center;">
            <h2>Preview expired or not found.</h2>
            <p style="color:#a8a29e;">Please re-clone the webpage from the dashboard.</p>
          </div>
        </body>
      </html>
    `);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.send(clone.html);
});

// ZIP Download endpoint
app.get('/api/download/:cloneId', (req, res) => {
  const { cloneId } = req.params;
  const clone = cloneStore.get(cloneId);

  if (!clone || !clone.zipBuffer) {
    return res.status(404).json({ error: 'Download expired. Please re-clone the webpage.' });
  }

  const safeDomain = (clone.domain || 'website').replace(/[^a-z0-9_-]/gi, '-');
  const filename = `${safeDomain}.full-page.Zippix.zip`;

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Length', clone.zipBuffer.length);
  res.send(clone.zipBuffer);
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Zippix Web Server running at: http://localhost:${PORT}`);
});
