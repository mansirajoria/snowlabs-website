# Components Documentation

This document provides details about the reusable React components found in `src/components/`.

---

## `Layout.tsx`

Provides the main structure for all pages, including the Navbar, Footer, and the main content area.

-   **Purpose:** Ensures consistent layout across the application.
-   **Features:**
    -   Renders `Navbar` and `Footer`.
    -   Renders the `ContactPopup` component to display it globally.
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
    -   Increased height (`h-20`) and adjusted link padding (`py-3`) for better visibility and clickability.
    -   Displays the "SnowLabs" logo linking to Home.
    -   Renders navigation links (`Home`, `Courses`, `About`, `Contact`) using `react-router-dom`'s `NavLink` for active state styling.
    -   Includes a "Get Started" `Button`.
    -   Contains the dark mode toggle button (Sun/Moon icon) which interacts with the `useDarkMode` hook.
    -   Responsive design with a mobile menu toggle and panel using `framer-motion` for animation (`AnimatePresence`).
    -   Applies appropriate light/dark mode styles (`bg-white dark:bg-gray-900`, `text-gray-800 dark:text-white`, etc.).
-   **Props:** None.

---

## `Footer.tsx`

Displays the site footer content.

-   **Purpose:** Provides supplementary information, links, and copyright details at the bottom of each page.
-   **Features:**
    -   Includes company info, social media links.
    -   Lists quick links and popular course links.
    -   Displays contact information.
    -   Shows copyright year and policy links (Privacy, Terms, Cookies).
    -   Styled for both light (`bg-gray-200`) and dark (`dark:bg-gray-900`) modes.
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
    -   Collects name, email, phone (optional), and message.
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

Displays a card representing a course, typically used in course listing pages.

-   **Purpose:** Standardized presentation for individual courses.
-   **Features:**
    -   Displays course image, title, brief description, instructor name/image, rating, duration, and price.
    -   Updated to display price using the Rupee symbol (`₹`).
    -   Includes a link to the course detail page.
    -   Uses `framer-motion` for hover effects (scale) and entrance animation.
    -   Styled for light/dark modes.
-   **Props:** (Assumed based on typical usage, verify actual implementation if needed)
    -   `course`: Object containing course details (e.g., `id`, `title`, `description`, `imageUrl`, `instructor`, `rating`, `duration`, `price`, `slug`).
    -   `className?`: `string`

---

## `ContactPopup.tsx`

A modal popup component designed to capture user contact information.

-   **Purpose:** Presents a non-intrusive way to encourage user contact shortly after site visit.
-   **Features:**
    -   Displays after a 5-second delay (`setTimeout` in `useEffect`).
    -   Uses `localStorage` (`hasClosedContactPopup` item) to ensure it only appears once per browser session.
    -   Features a two-column layout (on wider screens) with an image (`/public/popup-image.jpeg`) and a contact form.
    -   Form includes fields for Name, Email, and Message.
    -   Form submission uses the same Formspree integration as `ContactForm.tsx` (`VITE_FORMSPREE_ENDPOINT`) but adds a `_source: 'popup_form'` field to the submitted data.
    -   Includes success and error states with appropriate messaging.
    -   Visually styled with gradients, backdrop blur, input icons, and animations via `framer-motion`.
    -   Easily dismissible by clicking the backdrop or the close button.
    -   Uses a high `z-index` (`z-[100]`) to appear above other content like the Navbar.
-   **Integration:** Rendered within `Layout.tsx` to appear on all pages.
-   **Props:** None.

---

## `Page Components (in src/pages/)`

While not reusable components in the same way, it's worth noting updates to page-level components:

### `CourseDetail.tsx`

-   **Data Fetching:** Modified the Sanity GROQ query to fetch the category name (`category->title`) instead of just the reference object.
-   **Rendering:** Updated to display `course.categoryName` instead of `course.category` to fix the "Objects are not valid as a React child" error.
-   **Currency:** Updated to display the course price using the Rupee symbol (`₹`).

### `Courses.tsx`

-   Relies on `CourseCard.tsx` for rendering individual courses, inheriting the currency update. No direct currency changes were needed here. 