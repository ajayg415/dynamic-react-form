import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

const rootEl = document.getElementById("root");


if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
} else {
  // fallback: mount to body
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
  const root = createRoot(div);
  root.render(<App />);
}