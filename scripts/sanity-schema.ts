#!/usr/bin/env ts-node
/**
 * Sanity Schema Management Script
 * 
 * This script helps you create/update Sanity schemas and documents programmatically.
 * 
 * Usage:
 *   npx ts-node scripts/sanity-schema.ts --create-schema
 *   npx ts-node scripts/sanity-schema.ts --create-products
 *   npx ts-node scripts/sanity-schema.ts --list-products
 */

import { createClient } from "@sanity/client";

// Configuration
const SANITY_PROJECT_ID = "li7v7pl2";
const SANITY_DATASET = "production";
const SANITY_TOKEN = process.env.SANITY_API_TOKEN; // Need token for mutations

// Create authenticated client
const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

// ============================================
// SCHEMA DEFINITIONS
// ============================================

const productSchema = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Product Title",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "image",
      type: "image",
      title: "Product Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "price",
      type: "number",
      title: "Price (₹)",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "originalPrice",
      type: "number",
      title: "Original Price (₹)",
    },
    {
      name: "discount",
      type: "number",
      title: "Discount (%)",
    },
    {
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "highlights",
      type: "array",
      title: "Product Highlights",
      of: [{ type: "string" }],
    },
    {
      name: "specs",
      type: "object",
      title: "Specifications",
      fields: [
        { name: "age", type: "string", title: "Recommended Age" },
        { name: "subjects", type: "string", title: "Subjects" },
        { name: "connectivity", type: "string", title: "Connectivity" },
        { name: "safety", type: "string", title: "Safety" },
        { name: "battery", type: "string", title: "Battery Life" },
        { name: "warranty", type: "string", title: "Warranty" },
      ],
    },
    {
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule: any) => Rule.min(0).max(5),
    },
    {
      name: "reviews",
      type: "number",
      title: "Number of Reviews",
    },
    {
      name: "inStock",
      type: "boolean",
      title: "In Stock",
      initialValue: true,
    },
  ],
};

const categorySchema = {
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Category Name",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
    },
  ],
};

const heroSlideSchema = {
  name: "heroSlide",
  type: "document",
  title: "Hero Slide",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
    {
      name: "image",
      type: "image",
      title: "Slide Image",
      options: { hotspot: true },
    },
    {
      name: "order",
      type: "number",
      title: "Display Order",
      initialValue: 0,
    },
  ],
};

const aboutCardSchema = {
  name: "aboutCard",
  type: "document",
  title: "About Card",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Card Title",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "content",
      type: "text",
      title: "Content",
    },
    {
      name: "bulletPoints",
      type: "array",
      title: "Bullet Points",
      of: [{ type: "string" }],
    },
    {
      name: "image",
      type: "image",
      title: "Card Image",
    },
    {
      name: "order",
      type: "number",
      title: "Display Order",
      initialValue: 0,
    },
  ],
};

const contactInfoSchema = {
  name: "contactInfo",
  type: "document",
  title: "Contact Information",
  fields: [
    {
      name: "emails",
      type: "array",
      title: "Email Addresses",
      of: [{ type: "string" }],
    },
    {
      name: "phones",
      type: "array",
      title: "Phone Numbers",
      of: [{ type: "string" }],
    },
    {
      name: "address",
      type: "text",
      title: "Address",
    },
  ],
};

// ============================================
// SAMPLE PRODUCTS
// ============================================

const sampleProducts = [
  {
    _type: "product",
    title: "AI Learning Tablet",
    slug: { _type: "slug", current: "ai-learning-tablet" },
    price: 4999,
    originalPrice: 5999,
    discount: 17,
    description: "An intelligent learning tablet designed for kids aged 3-10 with interactive lessons, games, and parental controls.",
    highlights: [
      "AI-powered lessons that adapt to your child's pace",
      "Over 500 educational activities",
      "Durable kid-friendly design",
      "Parental dashboard for monitoring",
    ],
    specs: {
      age: "3 – 10 years",
      subjects: "Math, Logic, Coding",
      connectivity: "Wi-Fi + Bluetooth",
      safety: "Kid-safe materials, ad-free",
      battery: "Up to 8 hours",
      warranty: "1 year",
    },
    rating: 4.9,
    reviews: 280,
    inStock: true,
  },
  {
    _type: "product",
    title: "Smart Learning Robot",
    slug: { _type: "slug", current: "smart-learning-robot" },
    price: 7999,
    originalPrice: 9999,
    discount: 20,
    description: "A friendly robot companion that teaches coding, math, and science through interactive play.",
    highlights: [
      "Voice-controlled interactions",
      "Teaches coding fundamentals",
      "Interactive games and stories",
      "Adapts to child's learning level",
    ],
    specs: {
      age: "3 – 10 years",
      subjects: "Coding, Math, Science",
      connectivity: "Wi-Fi + Bluetooth",
      safety: "Kid-safe materials",
      battery: "Up to 6 hours",
      warranty: "1 year",
    },
    rating: 4.8,
    reviews: 320,
    inStock: true,
  },
  {
    _type: "product",
    title: "Interactive Story Book",
    slug: { _type: "slug", current: "interactive-story-book" },
    price: 2999,
    originalPrice: 3499,
    discount: 14,
    description: "Touch-and-feel story books with audio narration and interactive elements.",
    highlights: [
      "20 classic stories included",
      "Audio narration with sound effects",
      "Touch-sensitive pages",
      "Develops reading skills",
    ],
    specs: {
      age: "2 – 8 years",
      subjects: "Reading, Listening",
      connectivity: "None required",
      safety: "BPA-free materials",
      battery: "N/A",
      warranty: "6 months",
    },
    rating: 4.7,
    reviews: 180,
    inStock: true,
  },
  {
    _type: "product",
    title: "Educational Puzzle Set",
    slug: { _type: "slug", current: "educational-puzzle-set" },
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    description: "A set of 50+ puzzles ranging from easy to challenging that boost cognitive skills.",
    highlights: [
      "50+ puzzles of varying difficulty",
      "Develops problem-solving skills",
      "Improves spatial reasoning",
      "Eco-friendly materials",
    ],
    specs: {
      age: "4 – 12 years",
      subjects: "Problem Solving, Logic",
      connectivity: "None required",
      safety: "Non-toxic materials",
      battery: "N/A",
      warranty: "1 year",
    },
    rating: 4.6,
    reviews: 150,
    inStock: true,
  },
];

// ============================================
// FUNCTIONS
// ============================================

async function listProducts() {
  try {
    const products = await client.fetch(`*[_type == "product"]{_id, title, price, "imageUrl": image.asset->url}`);
    console.log("\n📦 Products in Sanity:\n");
    console.table(products);
  } catch (error: any) {
    console.error("❌ Error fetching products:", error.message);
  }
}

async function createSampleProducts() {
  try {
    console.log("Creating sample products...\n");
    
    for (const product of sampleProducts) {
      // Check if product already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug: product.slug.current }
      );
      
      if (existing) {
        console.log(`⚠️ Product "${product.title}" already exists, skipping...`);
        continue;
      }
      
      const created = await client.create(product);
      console.log(`✅ Created: ${product.title} (ID: ${created._id})`);
    }
    
    console.log("\n🎉 Sample products created successfully!");
  } catch (error: any) {
    console.error("❌ Error creating products:", error.message);
    console.log("Make sure you have set SANITY_API_TOKEN environment variable");
  }
}

async function deleteAllProducts() {
  try {
    console.log("Deleting all products...\n");
    const products = await client.fetch(`*[_type == "product"]._id`);
    
    for (const id of products) {
      await client.delete(id);
      console.log(`🗑️ Deleted: ${id}`);
    }
    
    console.log("\n✅ All products deleted");
  } catch (error: any) {
    console.error("❌ Error deleting products:", error.message);
  }
}

// ============================================
// MAIN
// ============================================

function showHelp() {
  console.log(`
🚀 Sanity Schema Management Script

Usage:
  npx ts-node scripts/sanity-schema.ts [command]

Commands:
  --list-products       List all products in Sanity
  --create-products     Create sample products
  --delete-products     Delete all products (⚠️ Dangerous)
  --schema              Show schema definitions
  --help                Show this help message

Environment:
  Set SANITY_API_TOKEN in your .env file for write access

Sanity Studio URL:
  https://${SANITY_PROJECT_ID}.sanity.studio/
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "--list-products":
      await listProducts();
      break;
    case "--create-products":
      await createSampleProducts();
      break;
    case "--delete-products":
      await deleteAllProducts();
      break;
    case "--schema":
      console.log("📋 Schema Definitions:\n");
      console.log(JSON.stringify({
        product: productSchema,
        category: categorySchema,
        heroSlide: heroSlideSchema,
        aboutCard: aboutCardSchema,
        contactInfo: contactInfoSchema,
      }, null, 2));
      break;
    case "--help":
    default:
      showHelp();
      break;
  }
}

main();
