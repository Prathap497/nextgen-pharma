# NexaGen Pharmaceuticals — Static Website

A modern, premium pharmaceutical company website built with pure HTML, CSS, and vanilla JavaScript. Zero dependencies. Zero build tools. Deploys to GitHub Pages in minutes.

## 🗂 Folder Structure

```
/
├── index.html                  # Homepage (all main sections)
├── 404.html                    # Custom GitHub Pages 404 page
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # Search engine instructions
├── README.md                   # This file
├── assets/
│   ├── css/
│   │   └── styles.css          # All styles (single file)
│   └── js/
│       └── main.js             # All JavaScript (single file)
└── pages/
    ├── products.html           # Products catalog with JS filters
    └── contact.html            # Contact form + regional offices
```

## 🚀 GitHub Pages Deployment (Step-by-Step)

### Method A — Deploy from Root (Simplest)

1. **Create a GitHub repository**
   - Go to [github.com/new](https://github.com/new)
   - Name it: `nexagen-pharma` (or any name)
   - Set visibility: Public ✓
   - Click **Create repository**

2. **Upload your files**

   **Option 1 — GitHub Web UI (no terminal needed):**
   - Click **"uploading an existing file"** on the new repo page
   - Drag and drop ALL files and folders from this project
   - Commit with message: `Initial site upload`

   **Option 2 — Git CLI:**
   ```bash
   git init
   git add .
   git commit -m "Initial site upload"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nexagen-pharma.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages** (left sidebar)
   - Under **Source**, select: `Deploy from a branch`
   - Branch: `main` | Folder: `/ (root)`
   - Click **Save**

4. **Access your live site**
   - Wait ~2 minutes for the first build
   - Your site will be live at: `https://YOUR_USERNAME.github.io/nexagen-pharma/`
   - A green ✓ will appear in Settings → Pages with the URL

---

### Method B — Deploy from /docs Folder

If you prefer to keep source files separate:

1. Move all website files into a `/docs` subfolder:
   ```
   /docs/index.html
   /docs/404.html
   /docs/sitemap.xml
   /docs/robots.txt
   /docs/assets/...
   /docs/pages/...
   ```

2. In GitHub Pages settings, select:
   - Branch: `main` | Folder: `/docs`

---

### Method C — Custom Domain

1. In GitHub Pages settings, enter your domain under **Custom domain** (e.g. `nexagenpharma.com`)
2. In your DNS provider, add:
   - **Type A** records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME** record: `www` → `YOUR_USERNAME.github.io`
3. Check **Enforce HTTPS** after DNS propagates (~24–48 hours)
4. Update these files with your real domain:
   - `sitemap.xml` — replace `nexagenpharma.com` with your domain
   - `robots.txt` — replace `nexagenpharma.com` with your domain
   - `index.html` — update `<link rel="canonical">` and OG tags

---

## ✏️ Customization Guide

### Branding
- **Company name**: Search & replace `NexaGen` in all HTML files
- **Colors**: Edit CSS variables at the top of `assets/css/styles.css`
- **Fonts**: Change the Google Fonts import URL in each HTML file's `<head>`

### Content
- **Hero text**: Edit `index.html`, lines within `<section class="hero">`
- **Products**: Edit `productData` object in `assets/js/main.js` for modals; edit product cards in `pages/products.html`
- **Contact details**: Edit `pages/contact.html` — phone, email, address
- **WhatsApp**: Replace `+912267890123` in `contact.html` with your WhatsApp business number

### Maps
Replace the map placeholder in `contact.html` with a real Google Maps embed:
1. Go to [maps.google.com](https://maps.google.com)
2. Search your address → Share → Embed a map → Copy HTML
3. Replace the `.map-placeholder` div with the `<iframe>` code provided

### Downloads
Replace `href="#"` on download buttons with actual file paths:
```html
<a href="assets/downloads/who-gmp-certificate.pdf" class="btn btn-secondary btn-sm">Download</a>
```
Place your PDFs in `/assets/downloads/` folder.

### Contact Form Email
The form uses `mailto:` to open the user's email client. For server-free form submissions, consider:
- **Formspree** (free tier: 50 submissions/month): Replace `action` with your Formspree endpoint
- **Web3Forms** (free): Similar to Formspree, GitHub Pages compatible
- Example with Formspree:
  ```html
  <form action="https://formspree.io/f/YOUR_ID" method="POST">
  ```
  And remove the `e.preventDefault()` from `main.js` submit handler.

---

## 📱 Features

| Feature | Status |
|---|---|
| Responsive (mobile-first) | ✅ |
| Sticky navbar + scroll highlight | ✅ |
| Mobile hamburger menu | ✅ |
| Scroll reveal animations | ✅ |
| Animated counter stats | ✅ |
| Product category modal | ✅ |
| Product filter (JS, no reload) | ✅ |
| Contact form validation | ✅ |
| WhatsApp click-to-chat | ✅ |
| SEO meta tags + Open Graph | ✅ |
| Accessible (ARIA, semantic HTML) | ✅ |
| GitHub Pages 404 page | ✅ |
| Sitemap + robots.txt | ✅ |
| No build tools required | ✅ |
| No paid services | ✅ |

---

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome 80+ | ✅ Full |
| Firefox 75+ | ✅ Full |
| Safari 13+ | ✅ Full |
| Edge 80+ | ✅ Full |
| Mobile Safari | ✅ Full |
| Chrome Android | ✅ Full |

---

## 📄 Legal

Remember to replace all placeholder legal text with actual content reviewed by your legal team:
- Privacy Policy
- Terms of Use
- Medical disclaimer
- Cookie policy (if applicable to your market)

---

## 🛠 Performance Tips

- Images: When you add real photos, use WebP format and add `loading="lazy"` attribute
- Fonts: The Google Fonts preconnect links are already included for fast loading
- The CSS and JS are single files — no additional HTTP requests needed

---

*Built with ❤️ — Pure HTML, CSS, and Vanilla JS. No build tools. No frameworks. Just the web.*
