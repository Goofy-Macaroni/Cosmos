import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

// Set the API base URL to match the backend
setBaseUrl("http://localhost:5000/api");

createRoot(document.getElementById("root")!).render(<App />);
