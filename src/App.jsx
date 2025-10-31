import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import ProductPage from "./pages/Mattress/ProductPage";
import ProductDetail from "./pages/Mattress/ProductDetail";
import AdminLogin from "./dashboardadmin/AdminLogin";
import PrivateRoute from "./dashboardadmin/PrivateRoute";
import AdminDashboard from "./dashboardadmin/AdminDashboard";
import PillowPage from "./pages/Pillows/PillowPage";
import PillowDetails from "./pages/Pillows/PillowDetails";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/Contact/ContactUs";
import AddProduct from "./dashboardadmin/AddProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mattress" element={<ProductPage />} />
          <Route path="/mattress/:sku" element={<ProductDetail />} />
          <Route path="/pillow" element={<PillowPage />} />
          <Route path="/pillow/:sku" element={<PillowDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
