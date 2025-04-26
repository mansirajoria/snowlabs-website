import './index.css';
import React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./App";

// Get the root element
const container = document.getElementById('root');

// Ensure the container exists before creating the root
if (container) {
  // Create a root.
  const root = createRoot(container);

  // Initial render
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root container missing in index.html");
}