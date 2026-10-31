import crypto from 'crypto';
import { cloneWebsiteUrl } from '../server/cloner/engine.js';
import { createCloneZip, generateTailwindV4, generateTailwindV3, generateCssVariables } from '../server/cloner/packager.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid website URL.' });
  }

  const startTime = Date.now();

  try {
    const result = await cloneWebsiteUrl(url);
    const cloneId = crypto.randomUUID();
    const safeDomain = result.domain.replace(/[^a-z0-9_-]/gi, '-');

    res.status(200).json({
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
      isBotChallenge: result.isBotChallenge || false,
      challengeNotice: result.challengeNotice || null,
    });
  } catch (err) {
    console.error('Vercel API Clone Error:', err);
    res.status(500).json({
      error: err.message || 'Failed to clone website. Please try another URL.',
    });
  }
}
