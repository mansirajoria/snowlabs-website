# Styling Approach

This document details the styling strategy used in the SnowLabs website frontend, focusing on Tailwind CSS and dark mode implementation.

## Tailwind CSS

The primary styling mechanism is [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework.

-   **Configuration:** Tailwind is configured in `tailwind.config.js`. This file defines:
    -   `content`: Glob patterns specifying which files Tailwind should scan for class names to generate the necessary CSS.
    -   `darkMode`: Set to `'class'`, enabling the class-based dark mode strategy.
    -   `theme`: Contains customizations and extensions to the default Tailwind theme.
        -   `extend.fontFamily.sans`: Sets the default sans-serif font stack to `['Inter', 'sans-serif']`.
-   **Usage:** Styles are applied directly in the JSX using Tailwind utility classes (e.g., `className="text-blue-600 dark:text-blue-400 mb-4"`).
-   **CSS Generation:** Tailwind scans the files listed in `content` and generates only the CSS rules corresponding to the classes found. This process is integrated into the Vite build/dev server via PostCSS (`postcss.config.js`).
-   **Base Styles:** Global styles and Tailwind directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`) are included in `src/index.css`.

## Global Font

The primary font used throughout the application is "Inter".

-   **Loading:** The font is loaded from Google Fonts via `<link>` tags added in `index.html`.
-   **Application:** It's set as the default sans-serif font in `tailwind.config.js` (see above).

## Dark Mode

The application supports a light/dark mode toggle.

-   **Strategy:** Tailwind's `class` strategy is used (`darkMode: 'class'` in `tailwind.config.js`). This means dark mode styles are applied when a `dark` class is present on the `<html>` element.
-   **Toggling:**
    -   The `usehooks-ts` library's `useDarkMode` hook is utilized within the `src/components/Layout.tsx` component.
    -   This hook manages the theme state (light/dark) and automatically adds/removes the `dark` class to the `<html>` element based on user preference (stored in `localStorage`) or system preference.
    -   A toggle button is present in `src/components/Navbar.tsx` that calls the `toggle` function provided by the `useDarkMode` hook.
-   **Applying Dark Styles:**
    -   Dark mode styles are applied using the `dark:` variant prefix in Tailwind classes (e.g., `bg-white dark:bg-gray-800`, `text-gray-600 dark:text-gray-400`).
    -   Base dark background and text colors are applied in `src/components/Layout.tsx`.
    -   Individual components and page elements must include their own `dark:` variants for colors, backgrounds, borders, etc., where needed.

## Animation

Page transitions and component entrance animations are primarily handled using the [Framer Motion](https://www.framer.com/motion/) library.

-   **Page Transitions:** `AnimatePresence` is used in `src/App.tsx` to manage transitions between routes.
-   **Component Animations:** `motion` components (e.g., `motion.div`) are used within components (like `AnimatedSection.tsx`, `ContactForm.tsx`, pages) to define initial, animate, and transition properties. 

## Z-Index Management

-   For layered components like modals or popups, ensure appropriate `z-index` values are used.
    -   The `ContactPopup.tsx` uses `z-[100]` to ensure it appears above the `Navbar` (which typically has `z-50`). 