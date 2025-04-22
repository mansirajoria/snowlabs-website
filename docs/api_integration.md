# API Integration

This document describes integrations with external APIs used within the SnowLabs application.

## Formspree (Contact Form)

-   **Purpose:** Handles submissions from the contact form on the `/contact` page without requiring a custom backend endpoint.
-   **Integration Point:** `src/components/ContactForm.tsx`
-   **Mechanism:**
    1.  **Endpoint Configuration:** The specific Formspree form endpoint URL is configured via the `VITE_FORMSPREE_ENDPOINT` environment variable in the `.env` file.
    2.  **Submission:** When the user submits the form, the `handleSubmit` function in `ContactForm.tsx` prevents the default form submission.
    3.  It then makes an asynchronous `fetch` request (`POST`) to the configured Formspree endpoint.
    4.  The request headers include `Accept: application/json` and `Content-Type: application/json`.
    5.  The request body contains the form field data (name, email, phone, message) serialized as a JSON string. If a `courseId` prop was passed to the form, it is included in the submission data as `_courseId`.
    6.  **Response Handling:**
        -   If the `fetch` request is successful (response status is OK), the form state is cleared, and the status is set to `'success'` to display a confirmation message.
        -   If the response status is not OK, or if a network error occurs during the `fetch`, the error is logged to the console, and the form status is set to `'error'` to display an error message.
-   **Setup:** Requires creating a form on [Formspree.io](https://formspree.io/) and adding its unique endpoint URL to the `.env` file. 