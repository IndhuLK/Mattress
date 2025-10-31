import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { db } from "../config/firebase"; // ✅ make sure this path is correct
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const ProductManagement = ({ onAddNew, onEditProduct }) => {
  const [selectedType, setSelectedType] = useState("Mattress");
  const [products, setProducts] = useState([]);

  // 🧠 Fetch products from Firestore (Live update)
  useEffect(() => {
    const key = `${selectedType.toLowerCase()}Products`;
    const unsubscribe = onSnapshot(collection(db, key), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, [selectedType]);

  // 🗑️ Delete product (from Firestore)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const key = `${selectedType.toLowerCase()}Products`;
        await deleteDoc(doc(db, key, id));
        alert("🗑️ Product deleted successfully!");
      } catch (error) {
        console.error("❌ Error deleting product:", error);
        alert("Something went wrong while deleting the product.");
      }
    }
  };

  // ✏️ Edit product
  const handleEdit = (product) => {
    onEditProduct({ ...product, type: selectedType });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Product Management
        </h1>

        {/* ➕ Add Product */}
        <button
          onClick={onAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Add Product
        </button>
      </div>

      {/* 🔄 Product Category Switcher */}
      <div className="flex gap-3 mb-6">
        {["Mattress", "Pillow"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-5 py-2 rounded-full font-medium border ${
              selectedType === type
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 📦 Product List */}
      {products.length === 0 ? (
        <p className="text-gray-600 italic">
          No {selectedType} products found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image || (item.images && item.images[0]) || "/images/default.jpg"}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm">{item.brand}</p>
                <p className="text-blue-600 font-semibold">₹{item.price}</p>
                <p className="text-xs text-gray-500">SKU: {item.sku}</p>

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
