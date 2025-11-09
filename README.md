# برسام: شعله‌ای که هرگز خاموش نمی‌شود
# Barsam: A Flame That Never Fades

A beautiful memorial website dedicated to Barsam, featuring his mother Negin Salimi's book about love, loss, and hope.

---

## 🌟 About This Website

This is a multilingual memorial website that honors the memory of Barsam through his mother's powerful story. The website features:

- **Three Languages**: Farsi (primary), English, and Dutch
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop
- **Persian Cultural Elements**: Blue color scheme with subtle Iranian design motifs
- **Accessibility**: WCAG 2.1 AA compliant for inclusive access
- **Book Information**: Details about "Barsam: A Flame That Never Fades"
- **Free PDF Download**: Access to the book in PDF format
- **Amazon Purchase Link**: Direct link to Kindle edition

---

## 📁 Project Structure

```
Barsam-website/
├── index.html              # Main landing page with language detection
├── fa/                     # Farsi version (primary)
│   └── index.html
├── en/                     # English version
│   └── index.html
├── nl/                     # Dutch version
│   └── index.html
├── css/
│   ├── main.css           # Core styles and blue theme
│   ├── rtl.css            # Right-to-left styles for Farsi
│   ├── patterns.css       # Persian decorative patterns
│   └── responsive.css     # Mobile/tablet/desktop responsive design
├── js/
│   ├── main.js            # Main functionality
│   └── language-switcher.js # Language switching logic
├── assets/
│   ├── images/
│   │   └── barsam-photo.jpg  # Main photo
│   └── pdf/
│       └── Barsam-Farsi.pdf  # Free book download
├── README.md              # This file
└── .gitignore            # Git ignore rules
```

---

## 🚀 Quick Start

### Local Development

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/Barsam-website.git
   cd Barsam-website
   ```

2. **Open in your browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000

     # Python 2
     python -m SimpleHTTPServer 8000

     # Node.js (if you have npx)
     npx serve
     ```
   - Then visit: `http://localhost:8000`

### Deployment to GitHub Pages

1. **Create a new GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Barsam memorial website"
   ```

2. **Connect to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/barsam-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://yourusername.github.io/barsam-website/`

---

## 🎨 Design Features

### Color Palette

- **Primary Blue**: `#1E3A8A` - Deep blue for main elements
- **Light Blue**: `#60A5FA` - Accents and highlights
- **Sky Blue**: `#BAE6FD` - Soft backgrounds
- **Gold Accent**: `#D97706` - Persian calligraphy highlights
- **White**: `#FFFFFF` - Clean backgrounds
- **Gray Tones**: For readable text

### Typography

- **Farsi**: Vazirmatn font (Google Fonts)
- **English/Dutch**: Inter font (Google Fonts)
- **Base Size**: 18px for comfortable reading
- **Responsive**: Adjusts for mobile, tablet, desktop

### Persian Design Elements

- Shamseh (geometric sun pattern) in hero section
- Subtle tile patterns as section backgrounds
- Traditional border decorations
- Persian-style quote marks
- Blue gradient backgrounds
- Elegant gold accents

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

The website is mobile-first and adapts beautifully to all screen sizes.

---

## 🌍 Languages

### Primary Language: Farsi (فارسی)
- Full RTL (right-to-left) support
- Persian typography optimizations
- Cultural design elements

### English
- Professional translation
- LTR (left-to-right) layout
- Optimized for international readers

### Dutch (Nederlands)
- Complete translation for Dutch speakers
- Consistent design with other languages
- Local cultural considerations

Language preference is automatically saved and restored on subsequent visits.

---

## ✏️ How to Update Content

### Adding Reader Reviews

1. Open the relevant language file (e.g., `fa/index.html`)
2. Find the **Reviews Section** (search for `id="reviews"`)
3. Replace the "coming soon" message with review cards:

```html
<div class="reviews-content">
    <div class="review-card">
        <p class="review-text">"Review text here..."</p>
        <p class="review-author">— Reader Name</p>
    </div>
    <!-- Add more review cards -->
</div>
```

4. Add these styles to `css/main.css`:

```css
.review-card {
    background: var(--color-white);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
    box-shadow: 0 2px 10px rgba(30, 58, 138, 0.08);
    margin-bottom: var(--spacing-md);
}

.review-text {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-gray-700);
    font-style: italic;
    margin-bottom: var(--spacing-sm);
}

.review-author {
    text-align: right;
    color: var(--color-primary);
    font-weight: 600;
}
```

### Updating the PDF

1. Replace `assets/pdf/Barsam-Farsi.pdf` with your new PDF
2. Keep the same filename, or update all three HTML files if you change it

### Changing Images

1. Replace `assets/images/barsam-photo.jpg` with your new image
2. Recommended size: 600x600 pixels or larger (square format works best)
3. Keep the filename the same for automatic updates

### Updating Contact Information

Edit the contact section in each language file:

```html
<a href="mailto:your.email@example.com" class="email-link">
    <span class="email-icon">✉️</span>
    your.email@example.com
</a>
```

---

## 🔧 Customization

### Changing Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --color-primary: #1E3A8A;        /* Change main blue */
    --color-primary-light: #60A5FA;  /* Change light blue */
    --color-gold: #D97706;           /* Change gold accent */
    /* ... */
}
```

### Adjusting Fonts

Change fonts in the `<head>` of HTML files:

```html
<!-- Current: Vazirmatn for Farsi -->
<link href="https://fonts.googleapis.com/css2?family=Your-Font&display=swap" rel="stylesheet">
```

Then update in `css/main.css`:

```css
body {
    font-family: 'Your-Font', sans-serif;
}
```

---

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast ratios (WCAG AA compliant)
- Alt text for all images
- Focus indicators for interactive elements
- Skip-to-content link
- Screen reader friendly

---

## 📊 Analytics (Optional)

To add Google Analytics:

1. Get your Google Analytics tracking code
2. Add before `</head>` in each HTML file:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

---

## 🐛 Troubleshooting

### Language switcher not working
- Check browser console for errors
- Ensure `js/language-switcher.js` is loaded
- Verify file paths are correct

### Images not displaying
- Check file paths in HTML
- Ensure images are in `assets/images/`
- Verify image filenames match exactly (case-sensitive)

### PDF download not working
- Ensure PDF is in `assets/pdf/`
- Check filename matches in HTML
- Verify PDF isn't corrupted

### Layout issues on mobile
- Clear browser cache
- Check `css/responsive.css` is loaded
- Test in different browsers

---

## 📄 License

© 2025 Negin Salimi. All rights reserved.

This website and its content are dedicated to the memory of Barsam.

---

## 💙 About the Author

**Negin Salimi** is an Assistant Professor at Wageningen University, Netherlands. Born in Tehran to a Kurdish family, she has called both Iran and the Netherlands home. Mother of four children—Pedram, Behrad, Roza, and Barsam—Negin shares her journey of love, loss, and hope through her writing.

---

## 📧 Contact

For questions, feedback, or support:

**Email**: Negin.salimi@gmail.com

---

## 🙏 Acknowledgments

This website was created with love and care to honor Barsam's memory and share his story with the world.

> "برسام: شعله‌ای که هرگز خاموش نمی‌شود"
>
> "Barsam: A Flame That Never Fades"

---

*Last Updated: January 2025*