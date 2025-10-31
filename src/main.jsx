import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductProvider } from "./dashboardadmin/ProductContext.jsx";
import { SliderProvider } from "./dashboardadmin/SliderContext.jsx";
import { CartProvider } from "./components/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <SliderProvider>
        <CartProvider >
        <App />
        </CartProvider>
      </SliderProvider>
    </ProductProvider>
  </StrictMode>
);
