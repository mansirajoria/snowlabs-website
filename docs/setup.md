# Project Setup & Running

This document provides instructions on how to set up the development environment and run the SnowLabs website frontend application.

## Prerequisites

-   Node.js (v18 or later recommended)
-   npm (usually comes with Node.js)
-   Git

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root of the project directory by copying the example file:

```bash
cp .env.example .env
```

Then, edit the `.env` file and provide the necessary values:

-   `VITE_FORMSPREE_ENDPOINT`: The URL endpoint for your Formspree form used in the Contact page.

## Running the Development Server

To start the development server with hot reloading:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173` (or another port if 5173 is busy). The exact URL will be shown in the terminal output.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The output files will be placed in the `dist/` directory.

## Linting

To check the code for potential errors and style issues:

```bash
npm run lint
``` 