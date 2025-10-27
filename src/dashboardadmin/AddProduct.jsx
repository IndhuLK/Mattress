import React, { useState, useEffect } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    type: "",
    title: "",
    sku: "",
    brand: "",
    price: "",
    oldPrice: "",
    stock: "",
    size: "",
    thickness: "",
    features: "",
    warranty: "",
    material: "",
    warrantyTime: "",
    techSpecs: "",
    description: "",
    whyChoose: "",
    images: [],
  });

  // 🧠 SKU Auto-generation
  useEffect(() => {
    const { title, type, price, stock, size, thickness } = product;
    if (title || type || price || stock || size || thickness) {
      const makeShort = (str) =>
        str ? str.trim().toLowerCase().replace(/\s+/g, "-").slice(0, 9) : "";

      const titleShort = makeShort(title.split(" ").slice(0, 3).join("-"));
      const typeShort = makeShort(type.split(" ")[0]);
      const formattedSku = [
        titleShort,
        typeShort,
        price ? `p${price}` : "",
        stock ? `s${stock}` : "",
        size ? `sz${size}` : "",
        thickness ? `t${thickness}` : "",
      ]
        .filter(Boolean)
        .join("-");

      setProduct((prev) => ({ ...prev, sku: formattedSku }));
    }
  }, [product.title, product.type, product.price, product.stock, product.size, product.thickness]);

  // 🖼️ Handle multiple image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setProduct((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  // ❌ Delete image
  const handleDeleteImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  // ✍️ Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // ✅ Save to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing products from localStorage
    const existing = JSON.parse(localStorage.getItem("addedProducts")) || [];

    // Add new product
    const newProduct = {
      ...product,
      id: Date.now(),
      numericPrice: parseFloat(product.price) || 0,
      rating: 4.5,
      reviewCount: 0,
      image: product.images[0] || "/images/default.jpg",
    };

    localStorage.setItem("addedProducts", JSON.stringify([...existing, newProduct]));
    alert("✅ Product Added Successfully!");

    // Reset form
    setProduct({
      type: "",
      title: "",
      sku: "",
      brand: "",
      price: "",
      oldPrice: "",
      stock: "",
      size: "",
      thickness: "",
      features: "",
      warranty: "",
      material: "",
      warrantyTime: "",
      techSpecs: "",
      description: "",
      whyChoose: "",
      images: [],
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-2xl p-6"
      >
        {/* LEFT SIDE */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Add New Product
          </h2>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Product Type
            </label>
            <select
              name="type"
              value={product.type}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select type</option>
              <option value="Mattress">Mattress</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          {/* Title & SKU */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Product Title
              </label>
              <input
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                SKU (Auto)
              </label>
              <input
                value={product.sku}
                disabled
                className="w-full border rounded-md p-2 bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          {/* Brand, Price, Old Price */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Brand
              </label>
              <input
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Price ₹
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Old Price ₹
              </label>
              <input
                type="number"
                name="oldPrice"
                value={product.oldPrice}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          {/* Stock, Size, Thickness */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Stock
              </label>
              <select
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select</option>
                <option value="InStock">In Stock</option>
                <option value="OutOfStock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Size
              </label>
              <input
                name="size"
                value={product.size}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Thickness
              </label>
              <input
                name="thickness"
                value={product.thickness}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          {/* Product Features */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Product Features
            </label>
            <textarea
              name="features"
              value={product.features}
              onChange={handleChange}
              rows="2"
              placeholder="Enter product features"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Warranty, Material, Warranty Time */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Material
              </label>
              <textarea
                name="material"
                value={product.material}
                onChange={handleChange}
                placeholder="Material type"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Warranty Time
              </label>
              <textarea
                name="warrantyTime"
                value={product.warrantyTime}
                onChange={handleChange}
                placeholder="Duration"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Warranty
              </label>
              <input
                name="warranty"
                value={product.warranty}
                onChange={handleChange}
                placeholder="e.g. 1 Year"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Images & Details
          </h2>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Upload Images (Multiple)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-md p-2"
            />

            <div className="flex flex-wrap gap-3 mt-3">
              {product.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specification */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Technical Specification
            </label>
            <textarea
              name="techSpecs"
              value={product.techSpecs}
              onChange={handleChange}
              rows="3"
              placeholder="Example: Title → answer"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="3"
              placeholder="Write description"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Why Choose */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Why Choose This Product
            </label>
            <textarea
              name="whyChoose"
              value={product.whyChoose}
              onChange={handleChange}
              rows="3"
              placeholder="Enter key points"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
