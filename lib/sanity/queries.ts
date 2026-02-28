import { client } from "./client";

// Products
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      "sanityImages": images[_type == "image"].asset->url,
      "externalImages": images[_type == "externalImage"].url,
      price,
      discount,
      description,
      rating,
      reviews,
      ageRange,
      "category": category->title
    }`
  ).then((products: any[]) =>
    products.map((p: any) => {
      const allImages = [...(p.sanityImages || []), ...(p.externalImages || [])].filter(Boolean);
      return {
        ...p,
        image: allImages[0] || null,
        images: allImages,
      };
    })
  );
}

export async function getProductById(id: string) {
  return client.fetch(
    `*[_type == "product" && _id == $id][0] {
      _id,
      title,
      slug,
      "sanityImages": images[_type == "image"].asset->url,
      "externalImages": images[_type == "externalImage"].url,
      price,
      originalPrice,
      discount,
      description,
      highlights,
      specs,
      rating,
      reviews,
      inStock,
      "category": category->title
    }`,
    { id }
  ).then((p: any) => {
    if (!p) return null;
    const allImages = [...(p.sanityImages || []), ...(p.externalImages || [])].filter(Boolean);
    return {
      ...p,
      image: allImages[0] || null,
      images: allImages,
    };
  });
}

// Hero Slides
export async function getHeroSlides() {
  return client.fetch(
    `*[_type == "heroSlide"] | order(order asc) {
      _id, 
      heading, 
      description, 
      "image": image.asset->url
    }`
  );
}

// About Cards
export async function getAboutCards() {
  return client.fetch(
    `*[_type == "aboutCard"] | order(order asc) {
      _id, 
      title, 
      content, 
      bulletPoints, 
      "image": image.asset->url
    }`
  );
}

// Contact Info (singleton)
export async function getContactInfo() {
  return client.fetch(
    `*[_type == "contactInfo"][0] {
      emails, 
      phones, 
      address
    }`
  );
}
