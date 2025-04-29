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

-   **Purpose:** Fetches dynamic content like course details, categories, blog posts, interview questions, mock tests, and potentially other site content.
-   **Integration Point:** `src/sanityClient.ts` initializes the client using environment variables (`VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`). Various page/component `useEffect` hooks use this client.
-   **Mechanism:**
    -   Components use `client.fetch(GROQ_QUERY, params)` within `useEffect` hooks to retrieve data.
    -   **Examples:**
        -   `src/pages/Home.tsx`: Fetches `featured` and `isUpcoming` courses.
        -   `src/pages/CourseDetail.tsx`: Fetches detailed data for a specific course by slug.
        -   `src/pages/Courses.tsx`: Fetches all courses and categories.
        -   `src/pages/resources/BlogsListPage.tsx`: Fetches all blog posts.
        -   `src/pages/resources/BlogDetailPage.tsx`: Fetches a single blog post by slug.
        -   `src/pages/resources/InterviewQuestionsListPage.tsx`: Fetches all interview question sets.
        -   `src/pages/resources/InterviewQuestionDetailPage.tsx`: Fetches a single interview question set by slug.
        -   `src/pages/resources/MockTestPage.tsx`: Fetches all mock tests.
        -   `src/pages/resources/MockTestDetailPage.tsx`: Fetches a single mock test by slug.
-   **Schemas:** Defined in `sanity/schemas/`. Key schemas include:
    -   `course.ts`: Course structure (title, slug, descriptions, modules, etc.). Module descriptions support rich text.
    -   `category.ts`: Course categories.
    -   `blog.ts`: Blog posts (title, slug, excerpt, body, etc.).
    -   `interviewQuestionSet.ts`: Sets of interview questions (title, slug, questionsList).
    -   `interviewQuestion.ts`: Individual question/answer object (used in `interviewQuestionSet`).
    -   `mockTest.ts`: Mock tests (title, slug, description, instructions, questions).
    -   `mockTestQuestion.ts`: Individual mock test question object (question, options, explanation - used in `mockTest`).
-   **Setup:** Requires a Sanity project with the defined schemas and project ID/dataset configured in `.env`. 