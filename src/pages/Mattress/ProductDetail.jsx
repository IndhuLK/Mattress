import { useState } from "react";
import {
  Star,
  Share2,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import pillow1 from '/src/assets/Pillow1.jpeg'
import pillow2 from '/src/assets/Pillow2.jpeg'
import pillow3 from '/src/assets/Pillow3.jpeg'

const ProductDetail = () => {
  const { sku } = useParams();
  const { state } = useLocation();
  const product = state?.product || products.find((p) => p.sku === sku);

  if (!product) return <p>Product not found.</p>;

  const [selectedImage, setSelectedImage] = useState(0);
  const [accordion, setAccordion] = useState({
    features: false,
    care: false,
    tips: false,
  });
  const [selectedSize, setSelectedSize] = useState("King");
  const [selectedThickness, setSelectedThickness] = useState("8 inch");
  const [quantity, setQuantity] = useState(1);

  const images = [product.image, "/images/sofa-white.jpg"]; // example images
  const mattressSizes = ["Single", "Double", "Queen", "King"];
  const thicknessOptions = ["6 inch", "8 inch", "10 inch"];

  const toggleAccordion = (section) => {
    setAccordion((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // JSON-LD Structured Data
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: images,
    description:
      product.description || "Premium memory foam mattress for spinal support.",
    sku: `${product.sku}-${selectedSize}-${selectedThickness.replace(" ", "")}`,
    brand: {
      "@type": "Brand",
      name: product.brand || "SleepWell",
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "INR",
      price: product.price.replace(/[^\d]/g, ""), // numeric price
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "152",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Size", value: selectedSize },
      { "@type": "PropertyValue", name: "Thickness", value: selectedThickness },
      {
        "@type": "PropertyValue",
        name: "Material",
        value: "Memory Foam + HR Foam",
      },
      { "@type": "PropertyValue", name: "Firmness", value: "Medium-Firm" },
      { "@type": "PropertyValue", name: "Warranty", value: "10 Years" },
    ],
  };

  return (
    <div>
    <div className="max-w-7xl mx-auto my-12 px-4 md:px-6 flex flex-col md:flex-row gap-12">
      {/* Inject JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>

      {/* Left Side: Info */}
      <div className="md:w-5/12 flex flex-col gap-3 order-2 md:order-1">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
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
              <p className="text-gray-400 line-through text-lg">
                {product.oldPrice}
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-1">In Stock</p>
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
            className="flex items-center justify-center gap-3 px-5 py-2 bg-[#745e46] 
          text-white rounded-full font-semibold hover:bg-[#5b4a3c] transition shadow-lg 
          w-full md:w-auto text-md cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
          <button
            className="px-8 py-2 bg-[#3d5f12] text-white rounded-full  font-semibold 
          hover:bg-[#2c460d] transition shadow-lg w-full md:w-auto cursor-pointer"
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
                className={`px-3 py-1 border-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                  selectedSize === size
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
        <div className="mt-1">
          <p className="font-medium mb-3 text-lg">Select Thickness:</p>
          <select
            value={selectedThickness}
            onChange={(e) => setSelectedThickness(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none 
            focus:ring-2 focus:ring-[#4e7265] focus:border-[#4e7265] w-1/4 max-w-xs"
          >
            {thicknessOptions.map((thick) => (
              <option key={thick}>{thick}</option>
            ))}
          </select>
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
                    <strong>Edge Stability:</strong> Reinforced corners prevent
                    sagging and maintain mattress shape.
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
                    <strong>Fabric:</strong> Premium breathable knit fabric with
                    soft-touch feel.
                  </li>
                  <li>
                    <strong>Core Material:</strong> High-resilience (HR) foam +
                    Memory foam for body contouring.
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
                    <strong>Warranty:</strong> 10 years of manufacturing
                    warranty covering sagging & foam defects.
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
                    <strong>Bonus Tip:</strong> Pair with a breathable mattress
                    protector to extend lifespan.
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
            Premium memory foam with breathable fabric. Supports spinal
            alignment, reduces pressure points. Washable zip cover. 10 Years
            Warranty.
          </p>
        </div>
        {/* Why Choose This Mattress */}
        <div className="mt-3">
          <h2 className="font-semibold text-xl mb-3">
            Why Choose This Mattress
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
            <li>Orthopedic-certified support</li>
            <li>Dual comfort (soft + firm sides)</li>
            <li>Temperature control fabric</li>
            <li>Hypoallergenic materials</li>
          </ul>
        </div>
      </div>

      {/* Right Side: Images */}
      <div className="md:w-7/12 order-1 md:order-2">
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
              className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition border-2 ${
                selectedImage === idx
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
                  <td className="px-4 py-2">Memory Foam + HR Foam</td>
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
                  <td className="px-4 py-2">10 Years</td>
                </tr>
              </tbody> 
            </table>
          </div>
          
        </div>
        
      </div>
       
    </div>


{/*mattress Details */}
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          DreamEase Orthopedic Memory Foam Mattress
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
                  ["Product Type", "Memory Foam Mattress"],
                  ["Thickness", "8 inches"],
                  ["Dimensions", "78” (L) × 72” (W) × 8” (H) - King Size"],
                  ["Comfort Level", "Medium-Firm"],
                  ["Material", "High-Density Memory Foam + HR Foam Base"],
                  ["Fabric Type", "Premium Knitted Breathable Cover"],
                  ["Color", "White with Grey Border"],
                  ["Warranty", "10 Years Manufacturer Warranty"],
                  [
                    "Included",
                    "1 Mattress, User Manual, Warranty Card",
                  ],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-200">
                    <td className="py-2 font-medium text-gray-800">{label}</td>
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
              Experience the perfect blend of comfort and support with the
              DreamEase Orthopedic Memory Foam Mattress. Designed to align your
              spine naturally, it provides balanced pressure relief for every
              sleeping position. The multi-layer construction ensures that your
              body gets personalized contouring while maintaining consistent
              firmness.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The breathable outer fabric promotes air circulation, keeping the
              mattress cool and hygienic even during warm nights. Say goodbye to
              back pain and restless sleep — and wake up refreshed every morning.
            </p>
          </div>
        </div>

        {/* Section 1 - Comfort Layer */}
        <div className="mt-16 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img
              src="/src/assets/mattress-comfort.jpg"
              alt="DreamEase Mattress Layers"
              className="rounded-2xl shadow-md w-full"
            />
          </div>
          <div className="lg:w-1/2 space-y-4">
            <h3 className="text-3xl font-semibold text-gray-800">
              Crafted for Deep, Restful Sleep
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The DreamEase Mattress features advanced memory foam that adapts
              to your body shape, evenly distributing weight and reducing motion
              transfer. Whether you sleep on your back or side, it provides
              personalized comfort that supports healthy posture.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The soft, knitted top fabric adds a premium touch and enhances
              ventilation, making every sleep session smoother and cooler.
            </p>
          </div>
        </div>

        {/* Section 2 - Durability */}
        <div className="mt-16 flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-4">
            <h3 className="text-3xl font-semibold text-gray-800">
              Built to Support You for Years
            </h3>
            <p className="text-gray-700 leading-relaxed">
              With a robust HR foam base and reinforced edge support, this
              mattress retains its structure and firmness even after years of
              use. The anti-sag design ensures lasting comfort without dips or
              uneven surfaces.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The removable and washable outer cover makes maintenance easy,
              keeping your mattress fresh and hygienic through every season.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/src/assets/mattress-durable.jpg"
              alt="Durable mattress material"
              className="rounded-2xl shadow-md w-full"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetail;
