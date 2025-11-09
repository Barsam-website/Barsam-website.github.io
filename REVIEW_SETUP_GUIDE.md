# 📝 Review System Setup Guide

Your website now has a **review submission system**! Users can submit reviews online, and you'll receive them via email for approval before publishing.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Free Formspree Account

1. Go to **https://formspree.io/register**
2. Sign up with your email (Negin.salimi@gmail.com)
3. Verify your email address
4. **Free tier includes**: 50 submissions/month (perfect for reviews!)

### Step 2: Create Your Form

1. Log in to Formspree
2. Click **"+ New Form"**
3. Form name: **"Barsam Book Reviews"**
4. Click **Create Form**
5. **Copy the Form ID** (looks like: `xpzvabcd`)

### Step 3: Update Your Website

Replace `YOUR_FORM_ID` in **all three language files** with your actual Form ID:

#### Files to update:
- `fa/index.html` (line 130)
- `en/index.html` (line 128)
- `nl/index.html` (line 128)

**Find this line:**
```html
<form id="reviewForm" class="review-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Replace with:**
```html
<form id="reviewForm" class="review-form" action="https://formspree.io/f/xpzvabcd" method="POST">
```
(Replace `xpzvabcd` with your actual Form ID)

### Step 4: Push to GitHub

```bash
cd /Users/hadimohammadi/Documents/Barsam-website
git add .
git commit -m "Add review submission system"
git push origin main
```

**Done!** ✅ Your review system is now live!

---

## 📧 How It Works

### When Someone Submits a Review:

1. **User fills out the form** on your website
2. **Formspree sends you an email** with:
   - Reviewer's name
   - Their rating (1-5 stars)
   - Their review text
   - Optional: their email
   - Language (Farsi, English, or Dutch)
3. **You receive email** at Negin.salimi@gmail.com
4. **You review and decide** whether to publish
5. **If approved**, you manually add it to the website

---

## ✅ How to Add Approved Reviews

When you approve a review, add it to the website:

### Step 1: Open the Language File

Example for Farsi reviews → edit `fa/index.html`

### Step 2: Find the Reviews List

Look for this section (around line 175):

```html
<div class="reviews-list" id="reviewsList">
    <!-- Reviews will be added here manually after approval -->
    <div class="no-reviews">
        <p>هنوز نظری ثبت نشده است. اولین نفری باشید که نظر خود را به اشتراک می‌گذارد!</p>
    </div>
</div>
```

### Step 3: Remove "No Reviews" and Add Review Card

**Remove this:**
```html
<div class="no-reviews">
    <p>هنوز نظری ثبت نشده است. اولین نفری باشید که نظر خود را به اشتراک می‌گذارد!</p>
</div>
```

**Add this:**
```html
<div class="review-card">
    <div class="review-header">
        <div class="review-author">نام خواننده</div>
        <div class="review-rating">★★★★★</div>
    </div>
    <p class="review-text">متن نظر خواننده در اینجا قرار می‌گیرد...</p>
    <div class="review-date">۱۵ دی ۱۴۰۴</div>
</div>
```

### Step 4: Customize the Review

Fill in the actual review details:

**For Farsi reviews:**
```html
<div class="review-card">
    <div class="review-header">
        <div class="review-author">علی محمدی</div>
        <div class="review-rating">★★★★★</div>  <!-- 5 stars -->
    </div>
    <p class="review-text">کتاب فوق‌العاده‌ای بود که قلب مرا لمس کرد. داستان برسام را همه باید بخوانند.</p>
    <div class="review-date">۱۵ دی ۱۴۰۴</div>
</div>
```

**For English reviews:**
```html
<div class="review-card">
    <div class="review-header">
        <div class="review-author">Sarah Johnson</div>
        <div class="review-rating">★★★★★</div>  <!-- 5 stars -->
    </div>
    <p class="review-text">An incredibly moving story. Negin's courage and love shine through every page.</p>
    <div class="review-date">January 5, 2025</div>
</div>
```

**Star Ratings:**
- 5 stars: ★★★★★
- 4 stars: ★★★★☆
- 3 stars: ★★★☆☆
- 2 stars: ★★☆☆☆
- 1 star: ★☆☆☆☆

### Step 5: Add Multiple Reviews

Simply add more `<div class="review-card">` elements:

```html
<div class="reviews-list" id="reviewsList">
    <div class="review-card">
        <!-- First review -->
    </div>

    <div class="review-card">
        <!-- Second review -->
    </div>

    <div class="review-card">
        <!-- Third review -->
    </div>
</div>
```

### Step 6: Push Updates

```bash
git add .
git commit -m "Add new reader review"
git push origin main
```

Reviews appear on your website in 1-2 minutes!

---

## 🎨 Review Form Features

### What Users Can Submit:
- ✅ Name (required)
- ✅ Email (optional - you can contact them back)
- ✅ Star rating 1-5 (required)
- ✅ Review text (required)

### Automatic Features:
- ✅ Spam protection
- ✅ Email notifications
- ✅ Form validation
- ✅ Success/error messages
- ✅ Mobile-friendly
- ✅ Multi-language support

---

## 📊 Formspree Dashboard

### View All Submissions:

1. Log in to https://formspree.io
2. Click on **"Barsam Book Reviews"** form
3. See all submissions with:
   - Date/time received
   - Reviewer details
   - Full review content
   - Export to CSV option

### Configure Settings:

**Email Notifications:**
- Get instant email when someone submits
- Customize email subject line
- Add multiple email addresses

**Spam Protection:**
- Built-in spam filtering
- reCAPTCHA option (if needed)
- Block specific domains

**Form Settings:**
- Custom thank you page (optional)
- Custom error page (optional)
- Auto-reply to reviewers (optional)

---

## 🛡️ Spam & Quality Control

### Dealing with Spam:

1. **Review every submission** before adding to website
2. **Check for real names** and genuine reviews
3. **Flag spam** in Formspree dashboard
4. **Enable reCAPTCHA** if spam becomes an issue

### Quality Guidelines:

**Publish reviews that:**
- ✅ Are genuine and thoughtful
- ✅ Add value for other readers
- ✅ Are respectful and appropriate
- ✅ Relate to the book

**Don't publish:**
- ❌ Spam or promotional content
- ❌ Offensive or inappropriate language
- ❌ Fake or suspicious reviews
- ❌ Off-topic comments

---

## 💡 Tips & Best Practices

### 1. Respond to Reviews (Optional)

You can email reviewers directly to:
- Thank them for their feedback
- Answer questions
- Build connections with readers

### 2. Feature Best Reviews

Highlight particularly moving reviews:
- Add to book description on Amazon
- Share on social media
- Include in book marketing

### 3. Regular Updates

Check Formspree weekly to:
- Approve new reviews
- Update website with latest feedback
- Monitor submission trends

### 4. Backup Reviews

Save all reviews in a spreadsheet:
- Date received
- Reviewer name
- Rating
- Review text
- Publication status

---

## 🔧 Advanced Options (Optional)

### Add reCAPTCHA Protection

If you get spam:

1. Go to Formspree dashboard
2. Click on your form
3. Settings → Spam Protection
4. Enable reCAPTCHA
5. Free and very effective!

### Custom Auto-Reply

Send automatic thank you email:

1. Formspree dashboard → Your form
2. Settings → Auto-Reply
3. Customize message:

```
Thank you for reviewing Barsam: A Flame That Never Fades!

Your review has been received and will be published on the website
after approval. We truly appreciate you taking the time to share
your thoughts.

With gratitude,
Negin Salimi
```

### Export Reviews

Download all reviews as CSV:

1. Formspree dashboard → Your form
2. Click **Export**
3. Download CSV file
4. Open in Excel/Google Sheets

---

## 🆘 Troubleshooting

### Form not working?

**Check:**
1. Did you replace `YOUR_FORM_ID` with actual ID?
2. Is Form ID correct in all 3 language files?
3. Did you verify your Formspree email?
4. Check browser console for errors

### Not receiving emails?

**Solutions:**
1. Check spam folder
2. Verify email in Formspree settings
3. Add formspree.io to safe senders
4. Check Formspree dashboard for submissions

### Reviews not displaying?

**Check:**
1. Did you remove `<div class="no-reviews">`?
2. Is HTML syntax correct?
3. Did you push changes to GitHub?
4. Clear browser cache and refresh

---

## 📞 Support

**Formspree Support:**
- Help Center: https://help.formspree.io
- Email: support@formspree.io

**For Website Issues:**
- Check README.md
- Check browser console for errors
- Test in different browsers

---

## ✨ Example Workflow

### Complete Example:

**1. User submits review** (Friday morning)

**2. You receive email:**
```
New submission from Barsam Book Reviews

Name: Sara Rezaei
Email: sara@example.com
Rating: 5
Review: این کتاب قلب مرا شکست و دوباره ساخت...
Language: fa
```

**3. You decide to publish** (Friday evening)

**4. Edit `fa/index.html`:**
```html
<div class="review-card">
    <div class="review-header">
        <div class="review-author">سارا رضایی</div>
        <div class="review-rating">★★★★★</div>
    </div>
    <p class="review-text">این کتاب قلب مرا شکست و دوباره ساخت...</p>
    <div class="review-date">۲۵ دی ۱۴۰۴</div>
</div>
```

**5. Push to GitHub:**
```bash
git add fa/index.html
git commit -m "Add Sara's 5-star review"
git push origin main
```

**6. Review is live!** (within 2 minutes)

---

## 🎉 Congratulations!

Your review system is ready! Users can now share their thoughts about Barsam's story, and you have full control over what gets published.

This creates:
- **Social proof** for potential readers
- **Community engagement** around the book
- **Meaningful connections** with readers
- **Valuable feedback** for you as an author

**Need help?** Email: Negin.salimi@gmail.com

---

*Last Updated: January 2025*