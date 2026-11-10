# St. John Public School - PWA Portal & Android App (.apk / .aab)

> **CBSE Affiliated #2133890 | School Code: 71204**  
> Main Campus: Shukul Bazar, District Amethi, Uttar Pradesh - 227811  
> English Medium • Nursery to 12th (Science & Arts Streams)

---

## 🚀 One-Click Demo Credentials (Zero-OTP)

For testing and Google Play Store Reviewers:
- **Master Admin Console**:
  - **Login ID**: `ADMIN227811`
  - **Password**: `StJohn@2026`
- **Student Portal Demo**:
  - **Login ID**: `RAH052012` (or `PRI082010`)
  - **Password**: `RAH052012` (or PIN: `4821`)
- *A 1-click Quick Pass chip is also provided right on the login screen.*

---

## 📱 How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   Outputs production-optimized PWA to `./dist/`.

---

## 📦 How to Generate Android (.apk / .aab) for Play Store

### Method 1: Using Bubblewrap (Google's Official CLI for Play Store TWAs)
```bash
# 1. Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize project from your live manifest
bubblewrap init --manifest=https://your-domain.com/manifest.json

# 3. Build signed APK / AAB
bubblewrap build
```

### Method 2: Using Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "St. John School" "com.stjohn.amethi" --web-dir=dist
npx cap add android
npx cap copy
npx cap open android
```
Inside Android Studio, click **Build > Generate Signed Bundle / APK**.

---

## ✨ Features Implemented

1. **Zero-OTP Deterministic Auto-ID Engine**:
   - `[First 3 Letters of Name] + [Month MM] + [Year YYYY]` (e.g., `RAH052012`).
2. **Public Portal (No Login Required)**:
   - Public Notice Board (category filters & PDF attachment downloads).
   - Academic Toppers Carousel (10th, 12th Science, 12th Arts, Home Exams).
   - Distinguished Alumni Wall of Fame (AIIMS, ISRO, IAF officers).
   - Campus Photo Gallery with Category Filters and Lightbox Zoom.
   - Admission Inquiry Modal form.
3. **Smart Excel (.xlsx / .csv) SheetJS Bulk Uploader**:
   - Fuzzy header matcher (Name, DOB, Class, Stream, Father Name, Mobile, Fees).
   - Live preview table with validation.
   - "Download Sample Excel Template" button.
4. **Camera & Gallery Upload**:
   - Native mobile camera trigger (`capture="environment"`).
   - Canvas-based client-side image compression (max 800px, 0.7 JPEG).
   - AI Register OCR Scanner for physical attendance registers.
5. **Complete Admin CRUD Operations**:
   - Real-time student directory search, edit, delete.
   - Daily attendance marker & fee status updater.
   - Public notices, toppers, and gallery CMS.
6. **Google Play Store & PWA Compliance**:
   - Valid `manifest.json` and standalone PWA display.
   - Service worker (`service-worker.js`) for offline caching.
   - Privacy Policy modal complying with Play Store Families & DPDP Act.
   - Mandatory Student Account & Data Deletion request button (Play Store requirement).
