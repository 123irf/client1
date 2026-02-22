import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

export async function GET() {
  try {
    // Test connection by fetching products count
    const products = await client.fetch(`*[_type == "product"]{_id, title}`);
    const heroSlides = await client.fetch(`*[_type == "heroSlide"]{_id, heading}`);
    const aboutCards = await client.fetch(`*[_type == "aboutCard"]{_id, title}`);
    
    return NextResponse.json({
      success: true,
      message: "Sanity is connected!",
      data: {
        productsCount: products.length,
        products: products,
        heroSlidesCount: heroSlides.length,
        heroSlides: heroSlides,
        aboutCardsCount: aboutCards.length,
        aboutCards: aboutCards,
      },
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Sanity connection failed",
      error: error.message,
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      }
    }, { status: 500 });
  }
}
