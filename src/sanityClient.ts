import { createClient } from '@sanity/client';

// Read environment variables safely
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'; // Default to 'production' if not set

// Basic error handling for missing environment variables
if (!projectId) {
  console.error(
    'Sanity project ID is missing. Make sure to set VITE_SANITY_PROJECT_ID in your .env file.'
  );
  // You might want to throw an error here in a real application
  // throw new Error("Missing VITE_SANITY_PROJECT_ID");
}

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: true, // set to `false` to bypass the edge cache if needed for real-time data
  apiVersion: '2024-08-19', // use current date (YYYY-MM-DD) to target the latest API version
  // token: import.meta.env.VITE_SANITY_SECRET_TOKEN // Only required for authenticated requests (mutations, drafts)
});

export default client; 