# Components Documentation

This document provides details about the reusable React components found in `src/components/`.

---

## `Layout.tsx`

Provides the main structure for all pages, including the Navbar, Footer, and the main content area.

-   **Purpose:** Ensures consistent layout across the application.
-   **Features:**
    -   Renders `Navbar` and `Footer`.
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
    -   Includes a link to the course detail page.
    -   Uses `framer-motion` for hover effects (scale) and entrance animation.
    -   Styled for light/dark modes.
-   **Props:** (Assumed based on typical usage, verify actual implementation if needed)
    -   `course`: Object containing course details (e.g., `id`, `title`, `description`, `imageUrl`, `instructor`, `rating`, `duration`, `price`, `slug`).
    -   `className?`: `string` 