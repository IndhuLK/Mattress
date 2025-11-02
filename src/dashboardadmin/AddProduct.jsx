import React, { useState, useEffect } from "react";
import { db, storage } from "../config/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProduct = ({ editData, onBack }) => {
  const emptyProduct = {
    type: "",
    title: "",
    sku: "",
    brand: "",
    price: "",
    oldPrice: "",
    stock: "",
    size: [],
    thickness: [],
    features: "",
    warranty: "",
    material: "",
    warrantyTime: "",
    techSpecs: "",
    description: "",
    whyChoose: "",
    images: [],
  };

  const [product, setProduct] = useState(emptyProduct);
  const [editId, setEditId] = useState(null);
  const [newSize, setNewSize] = useState("");
  const [newThickness, setNewThickness] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🧠 Load edit data if available
  useEffect(() => {
    if (editData) {
      setProduct({
        ...editData,
        size: Array.isArray(editData.size)
          ? editData.size
          : editData.size
          ? [editData.size]
          : [],
        thickness: Array.isArray(editData.thickness)
          ? editData.thickness
          : editData.thickness
          ? [editData.thickness]
          : [],
      });
      setEditId(editData.id);
    }
  }, [editData]);

  // 🧠 SKU Auto-generation
  useEffect(() => {
    const { title, type, price, stock, size, thickness } = product;

    if (title || type || price || stock || size || thickness) {
      const makeShort = (str) =>
        str ? str.trim().toLowerCase().replace(/\s+/g, "-") : "";

      const titleShort = makeShort(title);
      const typeShort = makeShort(type?.split(" ")[0]);

      const formattedSku = [
        titleShort,
        typeShort,
        price ? `p${price}` : "",
        stock ? `s${stock}` : "",
        size?.length ? `sz${size[0]}` : "",
        thickness?.length ? `t${thickness[0]}` : "",
      ]
        .filter(Boolean)
        .join("-");

      setProduct((prev) => ({ ...prev, sku: formattedSku }));
    }
  }, [
    product.title,
    product.type,
    product.price,
    product.stock,
    product.size,
    product.thickness,
  ]);

  // 🖼️ Handle multiple image uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const uploadedURLs = [];

    try {
      for (const file of files) {
        const imageRef = ref(
          storage,
          `product_images/${file.name}_${Date.now()}`
        );
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        uploadedURLs.push(downloadURL);
      }

      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedURLs],
      }));
    } catch (error) {
      console.error("❌ Image upload error:", error);
      alert("Image upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // ❌ Delete image
  const handleDeleteImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  // ✍️ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // 💾 Save or Update Product in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) {
    alert("Please wait until images finish uploading!");
    return;
  }

    try {
      const key =
        product.type.toLowerCase() === "mattress"
          ? "mattressProducts"
          : "pillowProducts";

      console.log("🟡 Saving to collection:", key);
      console.log("🟢 Product data before save:", product);

      if (editId) {
        // Update existing product
        const docRef = doc(db, key, editId);
        await updateDoc(docRef, {
          ...product,
          updatedAt: serverTimestamp(),
        });
        alert("✅ Product updated successfully!");
      } else {
        // Add new product
        await addDoc(collection(db, key), {
  ...product,
  numericPrice: parseFloat(product.price) || 0,
  rating: 4.5,
  reviewCount: 0,
  image: product.images && product.images.length > 0 ? product.images[0] : "",
  images: product.images || [],
  createdAt: serverTimestamp(),
});
        alert("✅ Product added successfully!");
      }

      // Reset after success
      setProduct(emptyProduct);
      setEditId(null);
      onBack();
    } catch (error) {
      console.error("❌ Error saving product:", error);
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {editId ? "Edit Product" : "Add Product"}
        </h1>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          ← Back
        </button>
      </div>

      {/* PRODUCT FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-2xl p-6"
      >
        {/* LEFT SIDE */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            {editId ? "Update Product Info" : "Add New Product"}
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
              <option value="Pillow">Pillow</option>
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

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Stock
            </label>
            <select
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-1/2 border rounded-md p-2"
            >
              <option value="">Select</option>
              <option value="InStock">In Stock</option>
              <option value="OutOfStock">Out of Stock</option>
            </select>
          </div>

          {/* Size & Thickness */}
          {/* Size */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600">
              Sizes (Add Multiple)
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="Enter size (e.g. 72x36)"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="flex-1 border rounded-md p-2"
              />
              <button
                type="button"
                onClick={() => {
                  if (newSize.trim() && !product.size.includes(newSize.trim())) {
                    setProduct({
                      ...product,
                      size: [...product.size, newSize.trim()],
                    });
                    setNewSize("");
                  }
                }}
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {product.size.map((s, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() =>
                      setProduct({
                        ...product,
                        size: product.size.filter((_, index) => index !== i),
                      })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Thickness */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600">
              Thickness (Add Multiple)
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="Enter thickness (e.g. 4 inch)"
                value={newThickness}
                onChange={(e) => setNewThickness(e.target.value)}
                className="flex-1 border rounded-md p-2"
              />
              <button
                type="button"
                onClick={() => {
                  if (
                    newThickness.trim() &&
                    !product.thickness.includes(newThickness.trim())
                  ) {
                    setProduct({
                      ...product,
                      thickness: [...product.thickness, newThickness.trim()],
                    });
                    setNewThickness("");
                  }
                }}
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {product.thickness.map((t, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() =>
                      setProduct({
                        ...product,
                        thickness: product.thickness.filter(
                          (_, index) => index !== i
                        ),
                      })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Features, Material, Warranty */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Product Features
            </label>
            <textarea
              name="features"
              value={product.features}
              onChange={handleChange}
              rows="2"
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Material
            </label>
            <textarea
              name="material"
              value={product.material}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Warranty Time
            </label>
            <input
              name="warrantyTime"
              value={product.warrantyTime}
              onChange={handleChange}
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
              className="w-full border rounded-md p-2"
            />
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
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-md p-2"
            />

            {uploading && (
              <p className="text-blue-600 text-sm mt-1">Uploading...</p>
            )}

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
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-white ${
                editId
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition`}
            >
              {editId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
