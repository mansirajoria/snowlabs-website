# Deployment

This document outlines the deployment process for the SnowLabs website frontend.

## Hosting Platform

The website is hosted on [Vercel](https://vercel.com/).

## Source Repository

The deployment is linked to the following GitHub repository:

`https://github.com/mansirajoria/snowlabs-website.git`

## CI/CD (Continuous Integration / Continuous Deployment)

Vercel provides automatic deployments through its seamless integration with GitHub.

-   **Production Branch:** Changes pushed or merged to the `main` branch (or the designated production branch configured in Vercel) automatically trigger a production build and deployment.
-   **Preview Deployments:** Pull requests opened against the production branch automatically generate preview deployments. This allows for reviewing changes in a live environment before merging.

## Build Process

Vercel uses the settings configured in the project (likely inferred from `package.json` and `vite.config.ts`) to build the application.

-   **Framework Preset:** Vercel typically auto-detects Vite.
-   **Build Command:** `npm run build` (or equivalent)
-   **Output Directory:** `dist`

## Environment Variables

Sensitive information and configuration variables required for the build or runtime (like API keys or service endpoints) must be configured in the Vercel project settings under "Environment Variables".

Key variables needed:

-   `VITE_SANITY_PROJECT_ID`: Your Sanity project ID.
-   `VITE_SANITY_DATASET`: Your Sanity dataset name (e.g., `production`).
-   `VITE_FORMSPREE_ENDPOINT`: The full URL for your Formspree form endpoint.

These variables should be added to the **Production**, **Preview**, and **Development** environments within Vercel as needed.

## Domains

Custom domains are configured within the Vercel project settings. 