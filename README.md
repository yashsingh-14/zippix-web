# ⚡ Zippix Web - AI-Powered Cloud Webpage Cloner & Token Ripper

Zippix Web is a full-stack SaaS application that clones any website from a single URL with pixel-perfect accuracy, full JavaScript execution, auto-scrolling for lazy-loaded assets, and instant production ZIP packaging.

---

## 🌟 Key Features

1. **1-Click Webpage Cloning**:
   - Enter any URL (e.g. `https://stripe.com`, `https://linear.app`).
   - Background Headless Chromium engine executes all React/Vue/Next.js hydration.
   - Smooth auto-scroll captures lazy-loaded images, videos, and scroll-triggered animations.

2. **Unified CSS & Design Tokens**:
   - Inlines and consolidates all stylesheets into a single clean file.
   - Generates **Tailwind CSS v4** (`theme.css`) and **Tailwind CSS v3** (`tailwind.config.js`).
   - Extracts CSS Custom Properties (`variables.css`) and full machine-readable JSON design tokens.

3. **Interactive Sandbox Preview**:
   - Live sandboxed iframe preview with responsive device toggles:
     - **Desktop** (100%)
     - **Laptop** (1024px)
     - **Tablet** (768px)
     - **Mobile** (375px)

4. **1-Click Production ZIP Export**:
   - `index.html` (Standalone, clean, offline-ready).
   - `assets/` (Extracted SVG icons and images).
   - `theme.css` & `tailwind.config.js`.
   - `variables.css`.
   - `tokens.json`.
   - `README.md`.

5. **Asset Ripper Gallery**:
   - Visual grid of all extracted images, SVGs, and videos with individual and bulk download support.

6. **SaaS Monetization Ready**:
   - Built-in freemium quota (2 free clones).
   - Golden PRO upgrade modal integrated with Lemon Squeezy / Gumroad checkout and license key activation.
   - Developer VIP Master Key: `ZIPPIX-VIP-03980838CB45`.

---

## 🚀 Quick Start

### 1. Run in Development
Run both the Express Backend (Port 5000) and the Vite Frontend (Port 3000) concurrently:

```bash
npm run dev
```

Then open your browser at:
👉 **http://localhost:3000**

### 2. Double-Click Launcher (Windows)
Double-click `start.bat` inside `C:\Users\rj\Desktop\zippix-web` to launch instantly!

---

## 🛠️ Architecture

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Obsidian Dark Glassmorphic UI.
- **Backend**: Express, Puppeteer Core (using native Chrome v128), JSZip, CORS.
- **Output**: Pure offline HTML + CSS + Tailwind v4 + SVGs.
