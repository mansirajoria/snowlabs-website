# Components Documentation

This document provides details about the reusable React components found in `src/components/`.

---

## `Layout.tsx`

Provides the main structure for all pages, including the Navbar, Footer, and the main content area.

-   **Purpose:** Ensures consistent layout across the application.
-   **Features:**
    -   Renders `Navbar` and `Footer`.
    -   Renders the `ContactPopup` component to display it globally.
    -   Renders the `WhatsAppChatWidget` component globally.
    -   Wraps the page content (`children`).
    -   Implements the core dark mode logic using `useDarkMode` hook from `usehooks-ts` to toggle the `dark` class on the `<html>` element.
    -   Applies base background colors for light (`bg-slate-50`) and dark (`dark:bg-gray-950`) modes to the main container.
-   **Props:**
    -   `children`: `React.ReactNode` - The page content to render within the layout.

---

## `Navbar.tsx`

Displays the main site navigation, logo, call-to-action button, and dark mode toggle.

-   **Purpose:** Provides consistent site navigation and branding at the top of each page.
-   **Features:**
    -   Fixed position at the top (`fixed top-0`).
    -   Displays the "SnowLabs" logo linking to Home.
    -   Renders navigation links (`Home`, `Trainings` (dropdown), `Resources` (dropdown), `About`, `Contact`) using `react-router-dom`'s `NavLink` for active state styling.
    -   "Trainings" dropdown lists specific services and includes an "Explore all courses" link at the bottom, linking to `/courses`.
    -   "Resources" dropdown links to `/resources/interview-questions`, `/resources/mock-test`,`/resources/blogs` and `/resources/webinars`.
    -   Includes a "Get Started" `Button` linking to `/contact`.
    -   Contains the dark mode toggle button (Sun/Moon icon).
    -   Responsive design with a mobile menu toggle and panel using `framer-motion`.
    -   Applies appropriate light/dark mode styles.
-   **Props:** None.

---

## `Footer.tsx`

Displays the site footer content across multiple columns.

-   **Purpose:** Provides supplementary information, links, and copyright details at the bottom of each page.
-   **Features:**
    -   **Layout:** Uses a 4-column grid layout on larger screens.
    -   **Column 1:** Company name/logo, brief description, contact address (New Delhi HQ).
    -   **Column 2:** Course category links (ServiceNow, RSA Archer).
    -   **Column 3:** Course category links (GRC, SAP) and Resource links (Webinars, Blogs, etc.).
    -   **Column 4:** Company & Legal links (About, Contact, Terms, Privacy, Refund Policy).
    -   Includes social media icons (LinkedIn, Twitter, Facebook, Instagram).
    -   Displays the current copyright year.
    -   Styled for dark mode (`bg-gray-900`).
    -   Uses a `FooterLink` helper component for consistent link styling.
-   **Props:** None.

---

## `Button.tsx`

A versatile button component supporting different styles, sizes, and optional icons.

-   **Purpose:** Provides a consistent button element across the application.
-   **Features:**
    -   Can render as a standard `<button>` or a `react-router-dom` `<Link>` if the `to` prop is provided.
    -   Supports different visual styles (`variant`: `primary`, `secondary`, `outline`, `ghost`).
    -   Supports different sizes (`size`: `sm`, `md`, `lg`).
    -   Allows adding an `icon` (ReactNode) and specifying its `iconPosition` (`left` or `right`).
    -   Can be set to `fullWidth`.
    -   Handles `disabled` state.
    -   Includes appropriate light/dark mode styling for different variants.
-   **Props:**
    -   `variant?`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `primary`)
    -   `size?`: `'sm' | 'md' | 'lg'` (default: `md`)
    -   `children`: `React.ReactNode`
    -   `onClick?`: `React.MouseEventHandler<HTMLButtonElement>`
    -   `type?`: `'button' | 'submit' | 'reset'` (default: `button`)
    -   `to?`: `string` (If provided, renders as a Link)
    -   `className?`: `string`
    -   `icon?`: `React.ReactNode`
    -   `iconPosition?`: `'left' | 'right'` (default: `left`)
    -   `disabled?`: `boolean`
    -   `fullWidth?`: `boolean`

---

## `ContactForm.tsx`

A form component for user inquiries, integrated with Formspree.

-   **Purpose:** Allows users to send messages via a contact form.
-   **Features:**
    -   Collects name (required), email (required), phone (required), and message (required).
    -   Handles form state using `useState`.
    -   Submits data asynchronously to a Formspree endpoint specified by the `VITE_FORMSPREE_ENDPOINT` environment variable.
    -   Displays different states: `idle`, `submitting`, `success`, `error`.
    -   Shows success message and clears form upon successful submission.
    -   Shows error message on submission failure.
    -   Includes loading indicator on the submit button during submission.
    -   Styled for light/dark modes, including input fields and status messages.
    -   Uses `framer-motion` for subtle animations on status changes.
-   **Props:**
    -   `title?`: `string` (Default: `'Get in Touch'`)
    -   `courseId?`: `string` (Optional ID to include in form submission)
    -   `className?`: `string`

---

## `AnimatedSection.tsx`

A wrapper component to apply simple entrance animations to its children.

-   **Purpose:** Provides consistent fade-in/slide-in animations for sections as they enter the viewport.
-   **Features:**
    -   Uses `framer-motion` (`motion.div`).
    -   Animates `opacity` and `y` or `x` position based on the `direction` prop.
    -   Uses `whileInView` to trigger the animation when the element scrolls into view.
    -   `viewport={{ once: true }}` ensures the animation only runs once.
    -   Supports an optional `delay`.
-   **Props:**
    -   `children`: `React.ReactNode`
    -   `className?`: `string`
    -   `direction?`: `'up' | 'down' | 'left' | 'right'` (default: `up`)
    -   `delay?`: `number` (default: `0`)

---

## `CourseCard.tsx`

Displays a card representing a course, used in course listing pages and the Home page.

-   **Purpose:** Standardized presentation for individual courses.
-   **Features:**
    -   Displays course image, title, description, category, tags, stats (duration, level, students, rating), and price.
    -   Includes a link to the course detail page (`/courses/:slug`).
    -   Uses `framer-motion` for hover effects and entrance animation.
    -   Styled for light/dark modes.
    -   Can display conditional badges ("Featured" or "Upcoming") based on props.
-   **Props:**
    -   `course`: `CourseType` object containing course details.
    -   `displayType?`: `'trending' | 'upcoming'` - Used to conditionally display the "Upcoming" badge (takes precedence over "Featured" badge).
    -   `index?`: `number` - Used for staggered animation delay.

---

## `ContactPopup.tsx`

A modal popup component designed to capture user contact information.

-   **Purpose:** Presents a non-intrusive way to encourage user contact shortly after site visit.
-   **Features:**
    -   Displays after a 5-second delay (`setTimeout`).
    -   Uses `localStorage` to appear only once per browser session.
    -   Features a two-column layout with an image and a contact form.
    -   Form includes fields for **Email (required)**, **Phone (required)**, and **Message (optional)**.
    -   Submits data to Formspree endpoint (`VITE_FORMSPREE_ENDPOINT`), adding `_source: 'popup_form'`.
    -   Includes success and error states.
    -   Dismissible by clicking backdrop or close button.
    -   Uses `framer-motion` for animations.
-   **Integration:** Rendered within `Layout.tsx`.
-   **Props:** None.

---

## `WhatsAppChatWidget.tsx` (New)

-   **Purpose:** Provides a persistent floating button to initiate a WhatsApp chat.
-   **Features:**
    -   Fixed position at the bottom-right (`fixed bottom-5 right-5 z-50`).
    -   Displays a Font Awesome WhatsApp icon.
    -   Links to `wa.me/` with pre-filled phone number and message.
    -   Shows a dismissible text bubble ("Connect with us on WhatsApp!") initially.
    -   Uses `framer-motion` for animations.
-   **Integration:** Rendered within `Layout.tsx`.
-   **Props:** None.

---

## `ScrollToTop.tsx`

A utility component that scrolls the window to the top on route changes.

-   **Purpose:** Fixes the issue where navigating to a new page via `react-router-dom` retains the scroll position of the previous page.
-   **Features:**
    -   Uses `useEffect` and `useLocation` hooks.
    -   Detects changes in `pathname`.
    -   Calls `document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" })` on path change.
-   **Integration:** Rendered within the `<Router>` component in `App.tsx`.
-   **Props:** None.

---

## `Page Components (in src/pages/)`

Notes on significant changes to page components:

### **New Resource Pages (`src/pages/resources/`)**

-   **Structure:** Following the pattern of `Courses.tsx` and `About.tsx`, these pages do *not* use the shared `Layout.tsx` component.
    -   They include `<Navbar/>` and `<Footer/>` directly.
    -   They apply top padding (`pt-28`) and background styles (`bg-slate-50 dark:bg-gray-950 min-h-screen`) to their own root `div` to handle layout below the fixed navbar.
-   **`InterviewQuestionsListPage.tsx` & `InterviewQuestionDetailPage.tsx`:**
    -   List and Detail views for sets of interview questions.
    -   Fetches content from Sanity based on `interviewQuestionSet` schema.
    -   Uses `PortableText` to render question answers.
-   **`MockTestPage.tsx` & `MockTestDetailPage.tsx`:**
    -   List and Detail views for mock tests.
    -   Fetches content from Sanity based on `mockTest` schema.
    -   Detail page displays questions/options/explanations in a read-only format.
    -   List page shows a "Coming Soon" message if no tests are published.
-   **`BlogsListPage.tsx` & `BlogDetailPage.tsx`:**
    -   List and Detail views for blog posts.
    -   Fetches content from Sanity based on `blog` schema.
    -   Uses `PortableText` to render blog body content, including images.

### `Home.tsx`

-   **Trusted By:** Section refactored to display a looping CSS marquee of company logos from `public/companies/` instead of static text names.
-   **Trending/Upcoming Courses:** Displays fetched courses in a Swiper carousel on all screen sizes (responsive slides per view, navigation arrows).
-   **Testimonials:** Now dynamically fetches testimonials marked for homepage display from Sanity (limit 3).
-   **Resources Details:** Items in this section are now clickable links to respective resource pages.
-   **Stats:** Updated values in the "Our Impact" section.

### `CourseDetail.tsx`

-   **Data Fetching:** Modified Sanity GROQ query to fetch `shortDescription`, `longDescription`, `modules` (including description), and `testimonials`.
-   **Rendering:**
    -   Displays `shortDescription` under "About This Course".
    -   Renders `longDescription` (Portable Text) in a new "Detailed Overview" section.
    -   Renders `modules.description` (Portable Text) within the Course Syllabus section.
    -   Renders fetched `testimonials` in a new "What Our Students Say" section.
    -   Enhanced `PortableText` component configuration (`ptComponents`) to handle lists and basic formatting marks.

### `About.tsx`

-   **Content:** Updated text for "About Us" and "Our Story". Updated stats in "Our Impact".
-   **Structure:** Removed "Leadership Team" section. Added new sections: "Get in Touch" (with contact details) and "Frequently Asked Questions" (using an accordion style with `FaqItem` helper component).

### `RefundPolicy.tsx` (New)

-   New page component created to display the company's refund and reschedule policy.
-   Accessible via the `/refund-policy` route.

### `WebinarsListPage.tsx` (New)

-   Displays a list of available webinars.
-   Fetches webinar data (title, slug, excerpt, image, date) from Sanity.
-   Shows webinars as cards linking to the detail page.
-   Includes Navbar and Footer directly.
-   Handles loading/error states.
-   Located at `/resources/webinars`.

### `WebinarDetailPage.tsx` (New)

-   Displays details for a single webinar fetched by slug.
-   Shows webinar title, presenter, date.
-   Embeds the YouTube video using `react-player`.
-   Renders the full description (Portable Text) below the video.
-   Includes Navbar and Footer directly.
-   Handles loading/error/not found states.
-   Located at `/resources/webinars/:slug`. 