import { client } from "./client";

// Products
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      "image": coalesce(images[0].asset->url, image.asset->url),
      "images": coalesce(images[].asset->url, select(defined(image) => [image.asset->url], [])),
      price,
      discount,
      description,
      rating,
      reviews,
      ageRange,
      "category": category->title
    }`
  );
}

export async function getProductById(id: string) {
  return client.fetch(
    `*[_type == "product" && _id == $id][0] {
      _id,
      title,
      slug,
      "image": coalesce(images[0].asset->url, image.asset->url),
      "images": coalesce(images[].asset->url, select(defined(image) => [image.asset->url], [])),
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
  );
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
