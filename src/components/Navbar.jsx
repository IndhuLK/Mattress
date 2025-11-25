// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Trash2,
} from "lucide-react";
import Logo from "/src/assets/logo.jpg";
import { db } from "/src/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useCart } from "/src/components/CartContext"; // ✅ Import useCart

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart } = useCart(); // ✅ Use context
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Product",
      submenu: [
        { name: "Mattress", path: "/mattress" },
        { name: "Pillow", path: "/pillow" },
      ],
    },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleMenuClick = () => setIsOpen(false);

  const handleDeleteItem = (id) => {
    removeFromCart(id); // ✅ Use context function
  };

  // ✅ Navigate to product details when clicking inside cart
  const handleProductClick = (item) => {
    setCartOpen(false);
    if (item.type?.toLowerCase() === "pillow") {
      navigate(`/pillow/${item.sku}`);
    } else {
      navigate(`/mattress/${item.sku}`);
    }
  };

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `WA-${timestamp}-${random}`;
  };

  // Handle Checkout - Save cart to Firestore then open WhatsApp
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      // Generate unique IDs
      const orderId = generateOrderId();
      const invoiceId = `INV-${Date.now()}`;

      // Calculate total
      const total = cart.reduce((sum, item) => {
        const price = typeof item.price === 'string'
          ? parseFloat(item.price.replace(/[₹ ,]/g, ""))
          : item.price;
        const quantity = item.quantity || 1;
        return sum + (price * quantity);
      }, 0);

      // Prepare order data for cart checkout (multiple items)
      const orderData = {
        orderId,
        invoiceId,
        items: cart.map(item => ({
          title: item.title,
          sku: item.sku,
          price: typeof item.price === 'string' ? item.price : `₹${item.price}`,
          image: item.images?.[0] || item.image,
          size: item.selectedSize || item.size || "N/A",
          thickness: item.selectedThickness || item.thickness || "N/A",
          quantity: item.quantity || 1
        })),
        itemCount: cart.length,
        total,
        customer: {
          name: "",
          phone: "",
          address: ""
        },
        status: "WhatsApp Pending",
        orderSource: "WhatsApp Cart",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Save to Firestore
      await addDoc(collection(db, "whatsappOrders"), orderData);

      // Prepare WhatsApp message for cart items
      const phoneNumber = "919500694734";
      let itemsList = "";
      cart.forEach((item, index) => {
        const itemPrice = typeof item.price === 'string'
          ? item.price
          : `₹${item.price}`;
        const quantity = item.quantity || 1;
        itemsList += `${index + 1}. ${item.title}\n`;
        itemsList += `   📏 Size: ${item.selectedSize || item.size || "N/A"}\n`;
        itemsList += `   📐 Thickness: ${item.selectedThickness || item.thickness || "N/A"}\n`;
        itemsList += `   🔢 Qty: ${quantity} × ${itemPrice}\n\n`;
      });

      const message = `🛒 *New Cart Order from E-Mattress*\n\n` +
        `📋 *Order ID:* ${orderId}\n` +
        `🧾 *Invoice:* ${invoiceId}\n\n` +
        `📦 *Items (${cart.length}):*\n${itemsList}` +
        `💰 *Total Amount:* ₹${total.toLocaleString()}\n\n` +
        `I would like to proceed with this order.`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

      alert("✅ Order saved! Opening WhatsApp...");
      setCartOpen(false);
    } catch (error) {
      console.error("Error saving cart order:", error);
      alert("❌ Failed to create order. Please try again.");
    }
  };

  return (
    <header className="w-full shadow-md relative">
      {/* 🔷 Offer Bar */}
      <div className="bg-[#745e46] text-white font-bold text-center text-md py-2 overflow-hidden">
        <marquee behavior="scroll" direction="left" scrollamount="6">
          Bring Home Comfort This Diwali — Up to ₹5,000 Off!
        </marquee>
      </div>

      {/* 🔹 Navbar Main */}
      <div className="flex items-center justify-between px-6 py-3 bg-white relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="h-20 w-20" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium relative z-10">
          {navLinks.map((link, index) =>
            link.submenu ? (
              <div key={index} className="relative group">
                <button className="flex items-center gap-1 text-[#36491f] hover:text-[#745e46] transition py-3 font-bold">
                  {link.name}
                  <ChevronDown size={16} className="mt-[2px]" />
                </button>
                <div className="absolute left-0 top-[100%] hidden group-hover:block bg-white shadow-lg border border-gray-100 rounded-md py-1 w-40 z-[99]">
                  {link.submenu.map((sub, i) => (
                    <Link
                      key={i}
                      to={sub.path}
                      onClick={handleMenuClick}
                      className="block px-4 py-2 text-sm text-[#36491f] hover:bg-gray-100 hover:text-[#745e46]"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={index}
                to={link.path}
                onClick={handleMenuClick}
                className="cursor-pointer text-[#36491f] hover:text-[#745e46] transition font-bold"
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-gray-700 relative">
          {/* Search */}
          <div className="flex items-center gap-2 border border-[#4e7265] rounded-md px-3 py-1 w-22 sm:w-64 shadow-xs shadow-[#4e7265] font-bold">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm w-full"
            />
          </div>

          <User className="cursor-pointer text-[#36491f]" size={24} />

          {/* Cart Icon with badge */}
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCart className="text-[#36491f]" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* 🔸 Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 md:hidden z-50">
            {navLinks.map((link, index) =>
              link.submenu ? (
                <div key={index} className="w-full">
                  <button
                    onClick={() => setIsProductOpen(!isProductOpen)}
                    className="py-2 w-full flex justify-between items-center text-[#5e782d] font-medium border-b border-gray-100"
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${isProductOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isProductOpen && (
                    <div className="pl-4 flex flex-col">
                      {link.submenu.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          onClick={handleMenuClick}
                          className="py-2 text-[#36491f] text-sm border-b border-gray-100 hover:text-[#745e46]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  onClick={handleMenuClick}
                  className="py-2 w-full text-[#5e782d] font-medium border-b border-gray-100 cursor-pointer hover:text-[#745e46]"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        )}
      </div>

      {/* 🔸 CART DRAWER */}
      <div
        className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${cartOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${cartOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#36491f]">
              Your Cart ({cart.length})
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <ShoppingCart size={64} className="text-gray-200" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="px-6 py-2 bg-[#745e46] text-white rounded-lg hover:bg-[#604d3a] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.sku}
                  className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#745e46]/30 transition-colors group cursor-pointer"
                  onClick={() => handleProductClick(item)}
                >
                  <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-semibold text-gray-900 line-clamp-2">
                        {item.title}
                      </h4>
                      {/* Old Price */}
                      {(item.oldPrice || item.oldprice) && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{Number(item.oldPrice || item.oldprice).toLocaleString()}
                        </p>
                      )}

                      {/* Stock Status */}
                      <p
                        className={`text-sm font-semibold mt-1 ${item.instock !== false ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {item.instock !== false ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-[#745e46] text-lg">
                        ₹{Number(item.price).toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.sku); // ✅ Use SKU
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    ₹
                    {cart
                      .reduce((total, item) => total + Number(item.price), 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#36491f]">
                  <span>Total</span>
                  <span>
                    ₹
                    {cart
                      .reduce((total, item) => total + Number(item.price), 0)
                      .toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#36491f] text-white font-bold rounded-xl
               hover:bg-[#2a3818] active:scale-[0.98] transition-all shadow-lg 
               shadow-[#36491f]/20 flex items-center justify-center gap-2">
                Checkout <span className="text-xl">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
