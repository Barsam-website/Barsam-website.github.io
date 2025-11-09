# 🚀 Deployment Guide - Barsam Memorial Website

Complete guide for deploying the Barsam memorial website to GitHub Pages.

---

## Prerequisites

Before you begin, make sure you have:

- ✅ A GitHub account ([create one here](https://github.com/signup))
- ✅ Git installed on your computer ([download here](https://git-scm.com/downloads))
- ✅ All website files in the `Barsam-website` folder

---

## Step-by-Step Deployment

### Step 1: Verify Your Files

Make sure your directory looks like this:

```
Barsam-website/
├── index.html
├── fa/
│   └── index.html
├── en/
│   └── index.html
├── nl/
│   └── index.html
├── css/
│   ├── main.css
│   ├── rtl.css
│   ├── patterns.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── language-switcher.js
├── assets/
│   ├── images/
│   │   └── barsam-photo.jpg
│   └── pdf/
│       └── Barsam-Farsi.pdf
├── README.md
├── .gitignore
└── DEPLOYMENT.md (this file)
```

---

### Step 2: Initialize Git Repository

Open Terminal (Mac/Linux) or Command Prompt/Git Bash (Windows), navigate to your project folder:

```bash
cd /Users/hadimohammadi/Documents/Barsam-website
```

Initialize Git:

```bash
git init
```

---

### Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon in the top right
3. Select **New repository**
4. Fill in the details:
   - **Repository name**: `barsam-website` (or your preferred name)
   - **Description**: "Memorial website for Barsam - A Flame That Never Fades"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README (we already have one)
5. Click **Create repository**

---

### Step 4: Connect Local Repository to GitHub

Copy the commands from the "…or push an existing repository from the command line" section on GitHub.

They should look like this (replace `yourusername` with your actual GitHub username):

```bash
git remote add origin https://github.com/yourusername/barsam-website.git
git branch -M main
```

---

### Step 5: Commit Your Files

Add all files to Git:

```bash
git add .
```

Create your first commit:

```bash
git commit -m "Initial commit: Barsam memorial website

- Added trilingual website (Farsi, English, Dutch)
- Implemented responsive design with blue theme
- Added Persian cultural design elements
- Included book information and PDF download
- Complete with accessibility features"
```

---

### Step 6: Push to GitHub

Push your code to GitHub:

```bash
git push -u origin main
```

If prompted, enter your GitHub username and password (or personal access token).

---

### Step 7: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under **Source**:
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **Save**

GitHub will show a message: "Your site is ready to be published at..."

---

### Step 8: Wait for Deployment

- Initial deployment takes 2-5 minutes
- You'll see a green checkmark when it's ready
- Your website URL will be: `https://yourusername.github.io/barsam-website/`

---

### Step 9: Verify Deployment

Visit your website URL and test:

- ✅ All three languages load correctly
- ✅ Language switcher works
- ✅ All images display
- ✅ PDF download works
- ✅ Amazon link opens correctly
- ✅ Responsive design works on mobile

---

## Custom Domain (Optional)

If you want to use a custom domain like `barsam.com`:

### Step 1: Purchase a Domain

Buy a domain from:
- [Namecheap](https://www.namecheap.com)
- [Google Domains](https://domains.google)
- [GoDaddy](https://www.godaddy.com)
- Any domain registrar

### Step 2: Configure DNS

Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

### Step 3: Configure GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `barsam.com`)
3. Click **Save**
4. Wait 24-48 hours for DNS propagation
5. Check **Enforce HTTPS** once DNS is ready

---

## Updating Your Website

After the initial deployment, to update your website:

### 1. Make changes to your local files

Edit HTML, CSS, or add new content.

### 2. Commit changes

```bash
git add .
git commit -m "Description of your changes"
```

### 3. Push to GitHub

```bash
git push origin main
```

GitHub Pages will automatically rebuild your site (takes 1-2 minutes).

---

## Common Issues & Solutions

### Issue: "Permission denied" when pushing

**Solution**: Set up SSH keys or use personal access token

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. Add to GitHub:
   - Copy the public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub Settings → SSH and GPG keys → New SSH key
   - Paste and save

3. Update remote URL:
   ```bash
   git remote set-url origin git@github.com:yourusername/barsam-website.git
   ```

### Issue: 404 Page Not Found

**Solution**: Check these:
- Is GitHub Pages enabled in Settings?
- Is the correct branch selected (main)?
- Is the folder set to / (root)?
- Wait 5-10 minutes after initial setup

### Issue: Images not loading

**Solution**:
- Verify image paths start with `../assets/images/`
- Check file names match exactly (case-sensitive)
- Ensure images were committed and pushed

### Issue: Language switching not working

**Solution**:
- Check JavaScript files are loaded
- Verify paths in `language-switcher.js`
- Check browser console for errors

### Issue: PDF download not working

**Solution**:
- Ensure PDF is in `assets/pdf/` folder
- Verify PDF was committed (not too large)
- GitHub has a 100MB file size limit

### Issue: Changes not appearing

**Solution**:
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait 2-3 minutes for GitHub Pages rebuild
- Check GitHub Actions tab for build status

---

## File Size Limits

GitHub has these limits:

- **Individual file**: Maximum 100MB
- **Repository**: Maximum 1GB (soft limit)
- **GitHub Pages site**: Maximum 1GB

If your PDF is larger than 100MB, consider:
1. Compressing it with tools like [Smallpdf](https://smallpdf.com/compress-pdf)
2. Hosting it externally (Google Drive, Dropbox) and linking to it

---

## Security Best Practices

### Protecting Email from Spam

The email address is visible in the HTML. To reduce spam:

1. Use a contact form service (optional):
   - [Formspree](https://formspree.io)
   - [Netlify Forms](https://www.netlify.com/products/forms/)

2. Or obfuscate email in JavaScript:
   ```javascript
   // In main.js
   const emailUser = 'Negin.salimi';
   const emailDomain = 'gmail.com';
   document.querySelector('.email-link').href = `mailto:${emailUser}@${emailDomain}`;
   ```

### HTTPS

GitHub Pages provides free HTTPS. Make sure:
- **Enforce HTTPS** is checked in Settings → Pages
- All external resources use HTTPS URLs

---

## Monitoring & Analytics

### GitHub Insights

View traffic to your site:
1. Go to repository
2. Click **Insights**
3. Click **Traffic**

You'll see:
- Page views
- Unique visitors
- Referring sites
- Popular content

### Google Analytics (Optional)

To add Google Analytics:

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get your tracking ID (G-XXXXXXXXXX)
3. Add to each HTML file before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Backup Strategy

### Regular Backups

Your code is backed up on GitHub, but also:

1. **Clone to multiple devices**:
   ```bash
   git clone https://github.com/yourusername/barsam-website.git
   ```

2. **Download ZIP periodically**:
   - Go to repository on GitHub
   - Click **Code** → **Download ZIP**

3. **Keep original files**:
   - Save original images separately
   - Keep source documents (DOC, PSD, etc.)

---

## Performance Optimization

### Image Optimization

Before committing large images:

1. Resize to appropriate dimensions:
   - Hero image: 600x600px
   - Thumbnails: 300x300px

2. Compress images:
   - Use [TinyPNG](https://tinypng.com)
   - Or [Squoosh](https://squoosh.app)

3. Use WebP format (optional):
   - Better compression
   - Modern browsers support it

### PDF Optimization

To reduce PDF size:
1. Use [Smallpdf](https://smallpdf.com/compress-pdf)
2. Or Adobe Acrobat's "Reduce File Size" feature
3. Target: Under 10MB for faster downloads

---

## SEO Optimization

Already included in the website:

- ✅ Meta descriptions
- ✅ Open Graph tags (for social sharing)
- ✅ Semantic HTML
- ✅ Descriptive alt text
- ✅ Clean URL structure

### Additional SEO Tips

1. **Submit to Google**:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your site
   - Submit sitemap (optional)

2. **Share on social media**:
   - Facebook, Twitter, LinkedIn
   - Social signals help with SEO

3. **Get backlinks**:
   - Share on relevant forums
   - Connect with book communities
   - University profile page

---

## Maintenance Schedule

### Weekly
- Check website loads correctly
- Test all three languages
- Verify PDF download works

### Monthly
- Review GitHub Analytics
- Check for broken links
- Update content if needed

### As Needed
- Add reader reviews
- Update book information
- Refresh images

---

## Support Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Git Tutorial**: https://git-scm.com/docs/gittutorial
- **Markdown Guide**: https://www.markdownguide.org

---

## Emergency Rollback

If something breaks:

### Revert last commit:
```bash
git revert HEAD
git push origin main
```

### Restore to specific version:
```bash
git log  # Find commit hash
git reset --hard <commit-hash>
git push origin main --force
```

---

## Success Checklist

Before announcing your website:

- ☑ All three languages load correctly
- ☑ Language switcher works smoothly
- ☑ All images display properly
- ☑ PDF downloads successfully
- ☑ Amazon link opens correctly
- ☑ Email link works
- ☑ Tested on mobile phone
- ☑ Tested on tablet
- ☑ Tested on desktop
- ☑ Tested in Chrome, Firefox, Safari
- ☑ Shared with a friend for feedback
- ☑ Analytics set up (if desired)
- ☑ Custom domain configured (if applicable)

---

## 🎉 Congratulations!

Your memorial website for Barsam is now live and accessible to the world!

**Website URL**: `https://yourusername.github.io/barsam-website/`

Share this URL with:
- Family and friends
- Social media
- Email signature
- University profile
- Book communities

---

**For questions or help, contact**: Negin.salimi@gmail.com

*In memory of Barsam - A flame that never fades* 💙