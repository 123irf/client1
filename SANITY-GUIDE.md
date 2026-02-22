# Sanity CMS Guide for KidZoFi

## 🔗 1. Access Sanity Studio (Web Editor)

**URL:** https://li7v7pl2.sanity.studio/

### What You Can Do Here:
- ✅ Upload/Edit products with images
- ✅ Manage categories
- ✅ Update hero slides
- ✅ Edit about cards
- ✅ Update contact information

---

## 🔧 2. Fix Connection Error

The error you see happens because Sanity requires authentication for read/write operations.

### Option A: Make Sanity Project Public (Recommended)

1. Go to **Sanity Manage**: https://www.sanity.io/manage/personal/project/li7v7pl2
2. Navigate to **API** tab
3. Under **CORS Origins**, add:
   - `http://localhost:3000`
   - `https://localhost:3000`
4. Under **Token**, create a new token with **Viewer** role (for read-only) or **Editor** role (for full access)
5. Copy the token

### Option B: Add Token to .env.local

Create/edit `kidzofi-next/.env.local`:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=li7v7pl2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_SC1lz8i9pR9iGy
RAZORPAY_KEY_SECRET=jX5Ld2C1Kuh6ziGmt7IobJAK
```

---

## 📝 3. Manage Products via Script

### List All Products
```bash
cd kidzofi-next
npx ts-node scripts/sanity-schema.ts --list-products
```

### Create Sample Products
```bash
cd kidzofi-next
npx ts-node scripts/sanity-schema.ts --create-products
```

### Delete All Products (⚠️ Warning)
```bash
cd kidzofi-next
npx ts-node scripts/sanity-schema.ts --delete-products
```

### Show Schema Definitions
```bash
cd kidzofi-next
npx ts-node scripts/sanity-schema.ts --schema
```

---

## 📁 4. Schema Files Location

Your schemas are defined in:

| File | Purpose |
|------|---------|
| `scripts/sanity-schema.ts` | TypeScript schema definitions |
| Original schemas | `src/sanity/schemas/` (old project) |

To create schemas in Sanity Studio, you need to set up a Sanity Studio project separately.

---

## 🌐 5. Sanity Studio Setup (For Custom Schemas)

If you want to edit schemas visually:

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Navigate to your project
cd path/to/your/sanity-studio

# Start Sanity Studio
sanity start
```

Or use the online Studio at: **https://li7v7pl2.sanity.studio/**

---

## 🎯 Quick Fix for Connection Error

1. **Add your localhost to CORS** in Sanity Manage:
   - Go to: https://www.sanity.io/manage/personal/project/li7v7pl2/api
   - Add `http://localhost:3000` to CORS Origins

2. **Update queries** to use direct image URLs:
   ```ts
   "image": image.asset->url
   ```

3. **Restart** your Next.js dev server

---

## 📊 Sanity Project Info

| Setting | Value |
|---------|-------|
| Project ID | `li7v7pl2` |
| Dataset | `production` |
| API Version | `2025-01-01` |
| Studio URL | https://li7v7pl2.sanity.studio/ |
| Manage URL | https://www.sanity.io/manage/personal/project/li7v7pl2 |

---

## 🆘 Troubleshooting

| Error | Solution |
|-------|----------|
| "Request error" | Add localhost to CORS origins |
| "401 Unauthorized" | Check SANITY_API_TOKEN is set |
| Images not loading | Use `image.asset->url` in queries |
| Can't write data | Token needs "Editor" or "Admin" role |
