# Folder Structure

This document outlines the main folder structure of the SnowLabs website frontend project.

```
/
├── docs/                 # Project documentation
├── public/               # Static assets (images, fonts, etc.) directly served
│   ├── companies/        # Company logos for marquee
│   │   ├── deloitte.png
│   │   ├── ey.png
│   │   ├── kpmg.png
│   │   ├── optum.png
│   │   ├── pwc.png
│   │   └── tcs.png
│   └── popup-image.jpeg  # Image used in the contact popup
├── sanity/               # Sanity Studio configuration and schemas
│   ├── schemas/          # Sanity schema definitions
│   │   ├── blog.ts
│   │   ├── category.ts
│   │   ├── course.ts
│   │   ├── interviewQuestion.ts
│   │   ├── interviewQuestionSet.ts
│   │   ├── mockTest.ts
│   │   └── mockTestQuestion.ts
│   ├── sanity.cli.ts     # Sanity CLI configuration
│   ├── sanity.config.ts  # Sanity Studio configuration
│   └── schemaTypes/      # Index file exporting schema types
│       └── index.ts
├── src/
│   ├── components/       # Reusable React components (e.g., Button, Navbar)
│   │   ├── Layout.tsx    # (Note: Not used by all pages anymore)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ContactPopup.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── CourseCard.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── ...             # Other components
│   ├── pages/            # Page-level components corresponding to routes
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Courses.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── Contact.tsx
│   │   ├── RefundPolicy.tsx
│   │   └── resources/      # Resource section pages
│   │       ├── BlogsListPage.tsx
│   │       ├── BlogDetailPage.tsx
│   │       ├── InterviewQuestionsListPage.tsx
│   │       ├── InterviewQuestionDetailPage.tsx
│   │       ├── MockTestPage.tsx
│   │       └── MockTestDetailPage.tsx
│   ├── assets/           # Project-specific assets (icons, images processed by build tool)
│   ├── styles/           # Global styles or specific CSS modules (if any, currently mainly index.css)
│   ├── App.tsx           # Main application component, routing setup
│   ├── index.css         # Global CSS styles, Tailwind directives
│   ├── index.tsx         # Application entry point, renders App component
│   └── sanityClient.ts   # Sanity.io client configuration
├── .env.example          # Example environment variables file
├── .env                  # Local environment variables (ignored by git)
├── .eslintrc.cjs         # ESLint configuration
├── .gitignore            # Git ignore rules
├── index.html            # Main HTML template (entry point for Vite)
├── package.json          # Project metadata and dependencies
├── postcss.config.js     # PostCSS configuration (used by Tailwind)
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.node.json    # TypeScript configuration for Node.js context (e.g., config files)
└── vite.config.ts        # Vite build tool configuration
```

## Key Directories

-   **`docs/`**: Contains all project documentation files in Markdown format.
-   **`public/companies/`**: Contains static company logo images used in the Home page marquee.
-   **`public/`**: Static assets placed here are copied directly to the build output root. Use this for assets that don't need processing by the build tool (e.g., `favicon.ico`, `popup-image.jpeg`).
-   **`sanity/`**: Contains the configuration and schema definitions for the Sanity Studio.
    -   **`schemas/`**: Holds the individual schema definitions for content types (e.g., `course.ts`, `blog.ts`).
    -   **`schemaTypes/index.ts`**: Exports all defined schema types for use in `sanity.config.ts`.
-   **`src/`**: Contains the main source code of the application.
    -   **`components/`**: Houses reusable UI components shared across different pages (e.g., `Button.tsx`, `Footer.tsx`, `ContactForm.tsx`, `ContactPopup.tsx`).
    -   **`pages/`**: Contains components that represent entire pages or views, mapped to specific routes (e.g., `Home.tsx`, `About.tsx`, `CourseDetail.tsx`).
    -   **`resources/`**: Subdirectory for the components related to the Resources section (Blogs, Interview Questions, Mock Tests).
    -   **`assets/`**: For assets like images or icons that are imported and potentially processed by Vite during the build.
    -   **`styles/`**: Global styles (`index.css`).
    -   **`App.tsx`**: The root component that sets up the main layout (`Layout.tsx`) and routing using `react-router-dom`.
    -   **`index.tsx`**: The entry point that renders the `App` component into the DOM.
    -   **`index.css`**: Includes Tailwind base, components, and utilities directives, and any custom global CSS.
    -   **`sanityClient.ts`**: Configures the connection to the Sanity.io backend.

## Configuration Files

-   **`.env`**: Stores environment-specific variables (like API keys). **Important:** This file should not be committed to Git.
-   **`tailwind.config.js`**: Configures Tailwind CSS, including theme customizations (fonts, colors), plugins, and content paths.
-   **`vite.config.ts`**: Configuration for the Vite build tool.
-   **`tsconfig.json`**: TypeScript compiler options.
-   **`.eslintrc.cjs`**: ESLint rules for code linting. 