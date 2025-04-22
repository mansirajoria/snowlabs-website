# Project Roadmap

This document outlines potential future development steps, planned features, and areas for improvement for the SnowLabs website frontend.

## Near-Term Goals (Core Functionality)

-   **Implement Courses Page (`/courses`):**
    -   Fetch and display a list of available courses (potentially from a mock API or static data initially).
    -   Use the `CourseCard.tsx` component.
    -   Implement filtering/sorting options.
    -   Ensure proper dark mode styling.
-   **Implement Course Detail Page (`/courses/:slug`):**
    -   Fetch and display details for a specific course based on the URL slug.
    -   Include course description, curriculum/modules, instructor info, pricing, enrollment button.
    -   Potentially integrate the `ContactForm` component for course-specific inquiries.
    -   Ensure proper dark mode styling.
-   **Implement Home Page (`/`):**
    -   Design and build the main landing page content.
    -   Include sections like hero banner, featured courses, testimonials, call-to-actions.
    -   Ensure proper dark mode styling.

## Mid-Term Goals (Enhancements & Features)

-   **User Authentication:**
    -   Implement user registration and login functionality.
    -   Create user profile pages.
    -   Manage user sessions.
    -   Consider using a service like Firebase Auth, Auth0, or a custom backend.
-   **Enrollment & User Progress:**
    -   Allow logged-in users to enroll in courses.
    -   Track user progress through courses.
    -   Display enrolled courses on the user profile.
-   **Backend Integration:**
    -   Replace mock/static data for courses with actual data fetched from a backend API.
    -   Develop API endpoints for courses, user data, enrollment, etc.
-   **Blog Section:**
    -   Create functionality for displaying blog posts.
    -   Potentially integrate with a Headless CMS (e.g., Contentful, Strapi, Sanity).

## Long-Term Goals & Maintenance

-   **Performance Optimization:**
    -   Code splitting.
    -   Image optimization.
    -   Lazy loading.
    -   Bundle size analysis.
-   **Accessibility (A11y) Audit & Improvements:**
    -   Perform a thorough accessibility review.
    -   Ensure compliance with WCAG standards.
-   **Testing:**
    -   Implement unit tests for components and utility functions.
    -   Add integration tests for user flows.
    -   Consider end-to-end testing (e.g., using Cypress or Playwright).
-   **Deployment & CI/CD:**
    -   Set up deployment pipelines (e.g., to Netlify, Vercel, AWS).
    -   Configure Continuous Integration/Continuous Deployment (CI/CD).
-   **Refactoring & Code Quality:**
    -   Address technical debt.
    -   Refactor components for better reusability and maintainability (e.g., based on reflections during development).
    -   Keep dependencies updated.

*Note: This roadmap is subject to change based on evolving project priorities.* 