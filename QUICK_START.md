# 🚀 Quick Start Guide - Barsam Website

## View the Website Locally

### Option 1: Double-Click (Easiest)
Simply double-click on `index.html` in the Barsam-website folder. Your default browser will open the website.

### Option 2: Local Server (Recommended)

**Using Python** (Mac/Linux - usually pre-installed):
```bash
cd /Users/hadimohammadi/Documents/Barsam-website
python3 -m http.server 8000
```

Then open your browser and go to: `http://localhost:8000`

---

## Deploy to GitHub Pages (3 Steps)

### Step 1: Initialize Git
```bash
cd /Users/hadimohammadi/Documents/Barsam-website
git init
git add .
git commit -m "Initial commit: Barsam memorial website"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Name it: `barsam-website`
3. Make it Public
4. DO NOT initialize with README
5. Click "Create repository"

### Step 3: Push and Enable Pages
```bash
git remote add origin https://github.com/YOUR_USERNAME/barsam-website.git
git branch -M main
git push -u origin main
```

Then:
1. Go to your repo Settings → Pages
2. Source: main branch, / (root)
3. Save

**Your website will be live at:**
`https://YOUR_USERNAME.github.io/barsam-website/`

---

## Test Checklist

Before going live, test:

- ☑ Open website in browser
- ☑ Click language buttons (فارسی, English, Nederlands)
- ☑ Check all sections load correctly
- ☑ Test PDF download button
- ☑ Test Amazon link
- ☑ Try on mobile phone
- ☑ Test email link

---

## Need Help?

**Full Documentation**:
- Complete guide: `README.md`
- Deployment details: `DEPLOYMENT.md`

**Quick Fixes**:
- **404 Error**: Wait 5 minutes after enabling GitHub Pages
- **Images not loading**: Check file paths in HTML
- **Language switch not working**: Clear browser cache

---

## File Structure

```
Barsam-website/
├── index.html              ← Main landing page
├── fa/index.html          ← فارسی version
├── en/index.html          ← English version
├── nl/index.html          ← Nederlands version
├── css/                    ← All styles
├── js/                     ← All scripts
├── assets/
│   ├── images/            ← Photos
│   └── pdf/               ← Book PDF
└── README.md              ← Full documentation
```

---

## Making Updates

After your site is live:

1. **Edit files** locally
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Updated content"
   ```
3. **Push to GitHub**:
   ```bash
   git push origin main
   ```

GitHub Pages updates automatically in 1-2 minutes.

---

## 🎉 That's It!

Your beautiful memorial website for Barsam is ready to share with the world.

**Share your website URL with**:
- Family and friends
- Social media
- Email signature
- Book readers

💙 *In memory of Barsam - A flame that never fades*