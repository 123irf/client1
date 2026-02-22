import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./client";

// Server-side only client with authentication
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});
