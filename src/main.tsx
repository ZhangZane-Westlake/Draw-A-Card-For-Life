import { createRoot } from "react-dom/client";
import { App } from "./App";

const root_element = document.getElementById("root");

if (!root_element) {
  throw new Error("Root element was not found.");
}

createRoot(root_element).render(<App />);
