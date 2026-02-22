# KidZoFi - Next.js Full-Stack Application

This is a full-stack e-commerce application built with **Next.js**, **Sanity CMS**, and **Razorpay** payment gateway.

## 🚀 Migration from React + Express to Next.js

This project was migrated from a React + Vite + Express setup to a unified Next.js architecture:

| Before | After |
|--------|-------|
| React + Vite (Frontend) | Next.js App Router |
| Express.js (Backend) | Next.js API Routes |
| Separate deployments | Single deployment |
| Client-side only | SSR + SSG support |

## 📁 Project Structure

```
kidzofi-next/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── create-order/  # Razorpay order creation
│   │   └── verify-payment/# Payment verification
│   ├── about/             # About page
│   ├── cart/              # Shopping cart
│   ├── contact/           # Contact page
│   ├── payment-status/    # Payment status
│   ├── product/[id]/      # Product detail (dynamic)
│   ├── products/          # Products listing
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── providers/         # Context providers
│   ├── AboutCards.tsx
│   ├── Footer.tsx
│   ├── HeroSlider.tsx
│   ├── NavBar.tsx
│   ├── ProductCard.tsx
│   ├── ProductSlider.tsx
│   └── *.css              # Component styles
├── lib/                   # Utilities
│   └── sanity/            # Sanity client & queries
├── public/                # Static assets
├── next.config.js         # Next.js config
├── tailwind.config.ts     # Tailwind CSS config
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **CMS**: [Sanity](https://sanity.io/)
- **Payments**: [Razorpay](https://razorpay.com/)
- **UI Icons**: React Icons
- **Carousel**: Swiper.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd kidzofi-next
npm install
```

2. Set up environment variables:
```bash
# Copy .env.local
cp .env.local.example .env.local

# Edit with your credentials:
# - Sanity Project ID, Dataset, Token
# - Razorpay Key ID and Secret
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🔑 Environment Variables

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## 📦 Sanity Schema

The project uses the following Sanity schemas:
- **product**: Products with title, slug, image, price, discount, description
- **heroSlide**: Hero slider content
- **aboutCard**: About page cards
- **contactInfo**: Contact information (singleton)

## 🎯 Features

- ✅ Server-side rendering for better SEO
- ✅ Static generation for product pages
- ✅ API Routes for payment processing
- ✅ Image optimization with next/image
- ✅ Responsive design
- ✅ Shopping cart with localStorage
- ✅ Razorpay payment integration
- ✅ Sanity CMS for content management

## 📝 License

This project is private and proprietary.
