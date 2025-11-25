import { useState, useEffect } from "react";
import {
  Star,
  Share2,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import pillow1 from "/src/assets/Pillow1.jpeg";
import pillow3 from "/src/assets/Pillow3.jpeg";
import { db } from "/src/config/firebase"; // ✅ Adjust path
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useCart } from "/src/components/CartContext";

const PillowDetails = () => {
  const { sku } = useParams();

  // ✅ All Hooks MUST be here (top of component)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [accordion, setAccordion] = useState({
    features: false,
    care: false,
    tips: false,
  });
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedThickness, setSelectedThickness] = useState("");

  const handleAddToCart = (product) => {
    if (!product) return;
    addToCart({
      ...product,
      instock: true, // ✅ Force in stock
      oldPrice: product.oldPrice, // ✅ Ensure camelCase
      quantity,
      selectedSize,
      selectedThickness,
    });
    alert(`${product.title} added to cart!`);
  };

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `WA-${timestamp}-${random}`;
  };

  // Handle Buy Now - Save order to Firestore then open WhatsApp
  const handleBuyNow = async () => {
    if (product.instock === false) return;

    try {
      // Generate unique IDs
      const orderId = generateOrderId();
      const invoiceId = `INV-${Date.now()}`;

      // Prepare order data
      const orderData = {
        orderId,
        invoiceId,
        product: {
          title: product.title,
          sku: product.sku,
          price: product.price,
          image: product.images?.[0] || product.image,
          size: selectedSize,
          thickness: selectedThickness
        },
        quantity,
        total: parseFloat(product.price.replace(/[₹ ,]/g, "")) * quantity,
        customer: {
          name: "",
          phone: "",
          address: ""
        },
        status: "WhatsApp Pending",
        orderSource: "WhatsApp",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Save to Firestore
      await addDoc(collection(db, "whatsappOrders"), orderData);

      // Prepare WhatsApp message
      const phoneNumber = "919500694734";
      const message = `🛒 *New Order from E-Mattress*\n\n` +
        `📋 *Order ID:* ${orderId}\n` +
        `🧾 *Invoice:* ${invoiceId}\n\n` +
        `📦 *Product:* ${product.title}\n` +
        `📏 *Size:* ${selectedSize}\n` +
        `📐 *Thickness:* ${selectedThickness}\n` +
        `🔢 *Quantity:* ${quantity}\n` +
        `💰 *Total:* ₹${orderData.total.toLocaleString()}\n\n` +
        `I would like to proceed with this order.`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

      alert("✅ Order saved! Opening WhatsApp...");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("❌ Failed to create order. Please try again.");
    }
  };

  // ✅ Fetch product from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(
          collection(db, "pillowProducts"),
          where("sku", "==", sku)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setProduct(querySnapshot.docs[0].data());
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [sku]);

  // ✅ Set initial selected size and thickness when product loads
  useEffect(() => {
    if (product) {
      const sizes = Array.isArray(product.size)
        ? product.size
        : product.size
          ? [product.size]
          : [];
      const thickness = Array.isArray(product.thickness)
        ? product.thickness
        : product.thickness
          ? [product.thickness]
          : [];

      if (sizes.length > 0 && !selectedSize) {
        setSelectedSize(sizes[0]);
      }
      if (thickness.length > 0 && !selectedThickness) {
        setSelectedThickness(thickness[0]);
      }
    }
  }, [product]);

  // ✅ JSON-LD Structured Data
  const productSchema = product && {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price?.replace(/[^\d]/g, ""),
      availability: "https://schema.org/InStock",
    },
  };

  // ✅ Must return AFTER hooks
  if (loading) return <p className="text-center py-20 text-lg">Loading...</p>;
  if (!product)
    return <p className="text-center py-20 text-lg">Product not found.</p>;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "/images/default.jpg"];

  const mattressSizes = Array.isArray(product.size)
    ? product.size
    : product.size
      ? [product.size]
      : [];
  const thicknessOptions = Array.isArray(product.thickness)
    ? product.thickness
    : [product.thickness || ""];

  const toggleAccordion = (section) => {
    setAccordion((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto my-12 px-4 md:px-6 flex flex-col md:flex-row gap-12 items-start">
        {/* Inject JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>

        {/* Left Side: Info */}

        <div className="md:w-6/12 order-1 md:order-1">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl shadow-xl border border-gray-100"
          />
          <div className="flex gap-3 mt-4 justify-start">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Thumbnail"
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition border-2 ${selectedImage === idx
                  ? "border-[#745e46] shadow-md"
                  : "border-gray-300 hover:border-[#745e46]"
                  }`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>
          {/* Share */}
          <div
            className="mt-6 flex items-center gap-2 text-gray-500 cursor-pointer
         hover:text-gray-900 transition font-medium"
          >
            <Share2 size={18} /> Share Product
          </div>
          {/* Technical Specifications */}
          <div className="mt-6">
            <h2 className="font-semibold text-xl mb-3">
              Technical Specifications
            </h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-700 text-sm">
                <tbody>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-4 py-2 font-medium">Material</td>
                    <td className="px-4 py-2">{product.material || "Memory Foam + HR Foam"}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 font-medium">Firmness</td>
                    <td className="px-4 py-2">Medium-Firm</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-4 py-2 font-medium">Thickness</td>
                    <td className="px-4 py-2">{selectedThickness}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 font-medium">Cover</td>
                    <td className="px-4 py-2">Washable Fabric</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium">Warranty</td>
                    <td className="px-4 py-2">{product.warrantyTime || "10 Years"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Images */}

        <div className="md:w-6/12 flex flex-col gap-3 order-2 md:order-2">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
            </div>
            <span className="text-gray-500 text-sm">(24 reviews)</span>
          </div>
          {/* 🏷️ Price Section with Old Price & Discount */}
          <div className="flex items-center gap-3 mt-2 relative">
            {/* Discount badge on image */}
            <div
              className="absolute -top-6 left-0 text-white text-xs font-semibold rounded bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: "url('/images/offer-badge.png')", // ✅ replace with your image path
                width: "65px",
                height: "25px",
              }}
            >
              {Math.round(
                ((product.oldPrice.replace(/[₹ ,]/g, "") -
                  product.price.replace(/[₹ ,]/g, "")) /
                  product.oldPrice.replace(/[₹ ,]/g, "")) *
                100
              )}
              % OFF
            </div>

            {/* Prices */}
            <div className="flex flex-col mt-4">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-[#3d5f12]">
                  {product.price}
                </p>
                {(product.oldPrice || product.oldprice) && (
                  <p className="text-gray-400 line-through text-lg">
                    {product.oldPrice || product.oldprice}
                  </p>
                )}
              </div>
              <p className={`text-sm font-semibold mt-1 ${product.instock !== false ? "text-green-600" : "text-red-600"}`}>
                {product.instock !== false ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </div>
          <hr className="my-2 border-gray-200" />
          {/* Quantity Selector */}
          <div className="mt-2 flex items-center gap-4">
            <p className="font-medium text-lg">Quantity:</p>
            <div className="flex items-center gap-3 ">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-4 py-2 text-xl hover:bg-gray-100 border border-gray-300 
              rounded-full transition cursor-pointer"
              >
                -
              </button>
              <span
                className="px-5 py-2 border-l border-r border-gray-300 border 
            rounded-lg font-medium transition"
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-xl hover:bg-gray-100 rounded-full border
               border-gray-300 transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          {/* Add to Cart & Buy Now */}
          <div className="flex gap-4 text-sm mt-3">
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.instock === false}
              className={`flex items-center justify-center gap-3 px-5 py-2 
                       text-white rounded-full font-semibold transition shadow-lg 
                          w-full md:w-auto text-md ${product.instock === false ? "bg-gray-400 cursor-not-allowed" : "bg-[#745e46] hover:bg-[#5b4a3c] cursor-pointer"}`}
            >
              <ShoppingCart className="w-5 h-5" /> {product.instock === false ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.instock === false}
              className={`px-8 py-2 text-white rounded-full font-semibold 
  transition shadow-lg w-full md:w-auto ${product.instock === false ? "bg-gray-400 cursor-not-allowed" : "bg-[#3d5f12] hover:bg-[#2c460d] cursor-pointer"}`}
            >
              Buy Now
            </button>

          </div>
          {/* Size Selection */}
          <div className="mt-1">
            <p className="font-medium mb-1 text-lg">Select Size:</p>
            <div className="flex gap-3 flex-wrap">
              {mattressSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border-2 rounded-lg text-sm font-semibold transition cursor-pointer ${selectedSize === size
                    ? "bg-[#745e46] text-white border-[#745e46] shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#745e46]"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Thickness Selection */}
          <div className="mt-6">
            {/* Thickness Section */}
            <p className="font-medium mb-3 text-lg">Select Thickness:</p>
            <div className="flex flex-wrap gap-3">
              {thicknessOptions.map((thick, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedThickness(thick)}
                  className={`px-4 py-2 border-2 rounded-full font-medium transition text-sm ${selectedThickness === thick
                    ? "bg-[#4e7265] text-white border-[#4e7265] text-sm"
                    : "border-[#4e7265] text-[#4e7265] hover:bg-[#4e7265] hover:text-white text-sm"
                    }`}
                >
                  {thick}
                </button>
              ))}
            </div>

            {/* Selected Thickness Display */}
            {selectedThickness && (
              <p className="mt-4 text-sm text-gray-700">
                Selected Thickness:{" "}
                <span className="font-semibold text-[#4e7265]">
                  {selectedThickness}
                </span>
              </p>
            )}
          </div>
          {/* 🪄 Accordion Sections */}
          <div className="mt-6 space-y-3">
            {/* Product Features */}
            <div className="border rounded-lg shadow-sm">
              <button
                className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-gray-50 transition"
                onClick={() => toggleAccordion("features")}
              >
                <span>Product Features</span>
                {accordion.features ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {accordion.features && (
                <div className="px-4 py-4 text-gray-700 border-t text-sm leading-relaxed space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Ergonomic Support:</strong> Designed to align your
                      spine and reduce pressure on joints.
                    </li>
                    <li>
                      <strong>Dual Comfort:</strong> One side medium-firm for
                      support, another side soft for relaxation.
                    </li>
                    <li>
                      <strong>AirFlow Technology:</strong> Breathable layers
                      prevent heat buildup and improve ventilation.
                    </li>
                    <li>
                      <strong>Anti-Microbial Fabric:</strong> Protects against
                      dust mites, allergens, and bacteria.
                    </li>
                    <li>
                      <strong>Edge Stability:</strong> Reinforced corners
                      prevent sagging and maintain mattress shape.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Materials & Care */}
            <div className="border rounded-lg shadow-sm">
              <button
                className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-gray-50 transition"
                onClick={() => toggleAccordion("care")}
              >
                <span>Materials & Care</span>
                {accordion.care ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {accordion.care && (
                <div className="px-4 py-4 text-gray-700 border-t text-sm leading-relaxed space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Fabric:</strong> Premium breathable knit fabric
                      with soft-touch feel.
                    </li>
                    <li>
                      <strong>Core Material:</strong> High-resilience (HR) foam
                      + Memory foam for body contouring.
                    </li>
                    <li>
                      <strong>Cover:</strong> Removable & washable zip cover for
                      easy cleaning.
                    </li>
                    <li>
                      <strong>Care Instructions:</strong> Do not fold, avoid
                      moisture, and keep away from direct sunlight.
                    </li>
                    <li>
                      <strong>Cleaning Tip:</strong> Spot clean with mild
                      detergent and vacuum regularly.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Warranty & Tips */}
            <div className="border rounded-lg shadow-sm">
              <button
                className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-gray-50 transition"
                onClick={() => toggleAccordion("tips")}
              >
                <span>Warranty & Tips</span>
                {accordion.tips ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {accordion.tips && (
                <div className="px-4 py-4 text-gray-700 border-t text-sm leading-relaxed space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Warranty:</strong> {product.warranty || "10 years of manufacturing warranty covering sagging & foam defects."}
                    </li>
                    <li>
                      <strong>Trial Period:</strong> Enjoy a 100-night risk-free
                      trial to ensure complete comfort.
                    </li>
                    <li>
                      <strong>Usage Tip:</strong> Rotate the mattress every 3
                      months for uniform wear.
                    </li>
                    <li>
                      <strong>Foundation:</strong> Use on a flat, ventilated
                      surface for better durability.
                    </li>
                    <li>
                      <strong>Bonus Tip:</strong> Pair with a breathable
                      mattress protector to extend lifespan.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <hr className="my-1 border-gray-200" /> {/* Product Description */}
          <div className="mt-6">
            <h2 className="font-semibold text-xl mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description || "Premium memory foam with breathable fabric. Supports spinal alignment, reduces pressure points. Washable zip cover. 10 Years Warranty."}
            </p>
          </div>
          {/* Why Choose This Mattress */}
          <div className="mt-3">
            <h2 className="font-semibold text-xl mb-3">
              Why Choose This Mattress
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
              {product.whyChoose ? (
                product.whyChoose.split('\n').filter(line => line.trim()).map((point, index) => (
                  <li key={index}>{point.trim()}</li>
                ))
              ) : (
                <>
                  <li>Orthopedic-certified support</li>
                  <li>Dual comfort (soft + firm sides)</li>
                  <li>Temperature control fabric</li>
                  <li>Hypoallergenic materials</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom description */}
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header (New Title) */}
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            CloudRest Premium Fiber Pillow
          </h1>

          {/* Product Info Grid */}
          <div className="grid lg:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-lg">
            {/* Left - Info Table */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Key Specifications
              </h2>
              <table className="w-full border-collapse">
                <tbody className="text-gray-700">
                  {[
                    ["Product Type", "Sleeping Pillow"],
                    ["Size", "66 cm (L) × 40.6 cm (W) × 12.7 cm (H)"],
                    ["Outer Fabric", "Soft Brushed Polyester"],
                    ["Color", "White with Grey Piping"],
                    ["Filling Material", "Hollow Conjugate Fiber"],
                    ["Weight", "900g (Approx.)"],
                    ["Warranty", "6 Months on Manufacturing Defects"],
                    ["Included", "2 Pillows, Care Guide"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-gray-200">
                      <td className="py-2 font-medium text-gray-800">
                        {label}
                      </td>
                      <td className="py-2 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right - Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Experience cloud-like comfort every night with the CloudRest
                Premium Fiber Pillow. Engineered with precision stitching and a
                hypoallergenic polyester shell, this pillow provides lasting
                softness while supporting your head and neck naturally.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The hollow fiber filling ensures breathability and bounce, so
                your pillow never goes flat. It’s designed for every sleeping
                position, making it the ideal choice for those who value
                restful, healthy sleep.
              </p>
            </div>
          </div>

          {/* Section 1 - Comfort Focus */}
          <div className="mt-16 flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <img
                src={pillow1}
                alt="CloudRest Pillow Comfort"
                className="rounded-2xl shadow-md w-full"
              />
            </div>
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-3xl font-semibold text-gray-800">
                Designed for Deeper Sleep
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The CloudRest Pillow is crafted for pure comfort. Its plush,
                cushiony fiber blend adapts to your natural posture — providing
                gentle neck alignment and relieving stress points while you
                rest.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Its premium micro-fiber shell adds a luxurious touch, keeping
                the pillow cool and breathable even during warm nights.
              </p>
            </div>
          </div>

          {/* Section 2 - Durability Focus */}
          <div className="mt-16 flex flex-col-reverse lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-3xl font-semibold text-gray-800">
                Built to Last, Night After Night
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Engineered with dense hollow fibers and double-stitched edges,
                the CloudRest Pillow retains its shape and loft even after
                long-term use. No sagging, no lumps — just consistent comfort.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you’re relaxing after a long day or getting ready for a
                deep sleep, this pillow promises durability and a plush feel
                that lasts for years.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src={pillow3}
                alt="Durable fiber pillow"
                className="rounded-2xl shadow-md w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PillowDetails;
