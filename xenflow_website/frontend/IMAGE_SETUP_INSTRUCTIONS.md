# Image Setup Instructions

## 📸 Client Testimonial Images

### Where to Add Images:
Place client photos in: `xenflow_website/frontend/public/images/testimonials/`

### Required Images:
1. **Sarah Mitchell** (CEO, SaaSify)
   - File: `sarah-mitchell.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

2. **James Kumar** (CTO, LogiChain)
   - File: `james-kumar.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

3. **Priya Sharma** (Operations Director, RetailPro)
   - File: `priya-sharma.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

4. **Michael Chen** (VP of Engineering, TechVentures)
   - File: `michael-chen.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

5. **Emily Rodriguez** (Chief Digital Officer, HealthCare Plus)
   - File: `emily-rodriguez.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

6. **David Thompson** (CFO, FinanceFlow)
   - File: `david-thompson.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

7. **Lisa Anderson** (Director of Innovation, EduTech Solutions)
   - File: `lisa-anderson.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

8. **Robert Martinez** (Managing Partner, RealEstate Pro)
   - File: `robert-martinez.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

9. **Jennifer Park** (Head of Operations, CloudScale Inc)
   - File: `jennifer-park.jpg`
   - Recommended size: 400x400px (square)
   - Format: JPG or PNG
   - Professional headshot

### Fallback:
If images are not found, the system will automatically show initials (e.g., "SM" for Sarah Mitchell).

---

## 🏢 Company Logos

### Where to Add Logos:
Place company logos in: `xenflow_website/frontend/public/images/clients/`

### Required Logos:
1. **SaaSify Logo**
   - File: `saasify-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)
   - White or colored logo on transparent background

2. **LogiChain Logo**
   - File: `logichain-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)
   - White or colored logo on transparent background

3. **RetailPro Logo**
   - File: `retailpro-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)
   - White or colored logo on transparent background

4. **TechVentures Logo**
   - File: `techventures-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)

5. **HealthCare Plus Logo**
   - File: `healthcare-plus-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)

6. **FinanceFlow Logo**
   - File: `financeflow-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)

7. **EduTech Solutions Logo**
   - File: `edutech-solutions-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)

8. **RealEstate Pro Logo**
   - File: `realestate-pro-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)

9. **CloudScale Inc Logo**
   - File: `cloudscale-logo.png`
   - Recommended size: 200x80px (or proportional)
   - Format: PNG with transparent background (preferred)

---

## 🏭 Trusted Partners Logos (Marquee Section)

### Where to Add Logos:
Update the `logos` array in `xenflow_website/frontend/src/pages/Home.jsx` (around line 194)

### Current Logos Array:
```javascript
const logos = [
  '/images/partners/google-logo.png',
  '/images/partners/microsoft-logo.png',
  '/images/partners/amazon-logo.png',
  '/images/partners/apple-logo.png',
  '/images/partners/facebook-logo.png',
  '/images/partners/spotify-logo.png',
  // Add more logos here
];
```

### Recommended Logo Specifications:
- **Location**: `xenflow_website/frontend/public/images/partners/`
- **Size**: 200x80px (or proportional, maintain aspect ratio)
- **Format**: PNG with transparent background (preferred)
- **Style**: Grayscale versions work best (will be converted to grayscale automatically)
- **Quantity**: Add 8-12 logos for smooth marquee effect

### Example Company Logos to Add:
- Google
- Microsoft
- Amazon
- Apple
- Meta/Facebook
- Spotify
- Netflix
- Tesla
- IBM
- Salesforce
- Adobe
- Oracle

### Notes:
- Logos will automatically be displayed in grayscale and become colored on hover
- The marquee will loop continuously
- Logos are duplicated for seamless infinite scroll
- If a logo fails to load, it will be hidden automatically

---

## 📁 Directory Structure

Create the following directory structure in `xenflow_website/frontend/public/`:

```
public/
  images/
    testimonials/
      sarah-mitchell.jpg
      james-kumar.jpg
      priya-sharma.jpg
      michael-chen.jpg
      emily-rodriguez.jpg
      david-thompson.jpg
      lisa-anderson.jpg
      robert-martinez.jpg
      jennifer-park.jpg
    clients/
      saasify-logo.png
      logichain-logo.png
      retailpro-logo.png
      techventures-logo.png
      healthcare-plus-logo.png
      financeflow-logo.png
      edutech-solutions-logo.png
      realestate-pro-logo.png
      cloudscale-logo.png
    partners/
      google-logo.png
      microsoft-logo.png
      amazon-logo.png
      apple-logo.png
      facebook-logo.png
      spotify-logo.png
      (add more as needed)
```

---

## ✅ Quick Checklist

- [ ] Create `public/images/testimonials/` directory
- [ ] Add 9 testimonial photos (sarah-mitchell.jpg, james-kumar.jpg, priya-sharma.jpg, michael-chen.jpg, emily-rodriguez.jpg, david-thompson.jpg, lisa-anderson.jpg, robert-martinez.jpg, jennifer-park.jpg)
- [ ] Create `public/images/clients/` directory
- [ ] Add 9 company logos (saasify-logo.png, logichain-logo.png, retailpro-logo.png, techventures-logo.png, healthcare-plus-logo.png, financeflow-logo.png, edutech-solutions-logo.png, realestate-pro-logo.png, cloudscale-logo.png)
- [ ] Create `public/images/partners/` directory
- [ ] Add 8-12 partner company logos
- [ ] Update `logos` array in `Home.jsx` with partner logo paths
- [ ] Test that all images load correctly
- [ ] Verify marquee animation works smoothly

---

## 🎨 Image Optimization Tips

1. **Compress images** before adding them (use tools like TinyPNG or ImageOptim)
2. **Use WebP format** for better performance (optional, but recommended)
3. **Maintain consistent aspect ratios** for logos
4. **Use professional photos** for testimonials
5. **Ensure transparent backgrounds** for logos when possible

