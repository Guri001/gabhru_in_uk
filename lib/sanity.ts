import { createClient } from "next-sanity";

const projectId = "n3t4hnr7";
const dataset = "production";
const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster reads
});
