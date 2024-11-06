import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/styles/reset.css";
import "/src/styles/style.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    //<StrictMode>
    <App />
    //</StrictMode>
);
