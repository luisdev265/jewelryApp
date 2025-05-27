import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./client/pages/App.tsx";
import Admin from "./admin/pages/Admin.tsx";
import Products from "./admin/pages/Products.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import DragAndDrop from "./admin/components/Products/ProductsComponents/DragAndDrop/DragAndDrop.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/drag" element={<DragAndDrop />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
