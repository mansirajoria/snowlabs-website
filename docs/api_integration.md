# API Integration

This document describes integrations with external APIs used within the SnowLabs application.

## Formspree (Contact Forms)

-   **Purpose:** Handles submissions from the contact forms (main `/contact` page and popup modal) without requiring a custom backend endpoint.
-   **Integration Points:** 
    - `src/components/ContactForm.tsx` (main contact page)
    - `src/components/ContactPopup.tsx` (popup modal)
-   **Mechanism:**
    1.  **Endpoint Configuration:** The Formspree endpoint URL is configured via `VITE_FORMSPREE_ENDPOINT` in `.env`.
    2.  **Submission:** `handleSubmit` functions make an asynchronous `fetch` request (`POST`) to the endpoint.
    3.  The request body contains form data serialized as JSON.
        - `ContactForm` sends: name, email, phone (optional), message, and optionally `_courseId`.
        - `ContactPopup` sends: email, phone, message (optional), and adds `_source: 'popup_form'`.
    4.  **Response Handling:** Sets form status (`success` or `error`) based on the fetch response.
-   **Setup:** Requires a Formspree account and form endpoint added to `.env`.

## Sanity.io (Content Management)

-   **Purpose:** Fetches dynamic content like course details, categories, and potentially other site content.
-   **Integration Point:** `src/sanityClient.ts` initializes the client using environment variables (`VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`). Various page/component `useEffect` hooks use this client.
-   **Mechanism:**
    -   Components use `client.fetch(GROQ_QUERY, params)` within `useEffect` hooks to retrieve data.
    -   **Examples:**
        -   `src/pages/Home.tsx`: Fetches `featured` and `isUpcoming` courses using specific GROQ queries with limits.
        -   `src/pages/CourseDetail.tsx`: Fetches detailed data for a specific course by slug, including `shortDescription`, `longDescription` (Portable Text), `testimonials`, `modules`, etc.
        -   `src/pages/Courses.tsx`: Fetches all courses, potentially with filtering.
-   **Setup:** Requires a Sanity project with the defined schema (courses, categories, etc.) and project ID/dataset configured in `.env`. 