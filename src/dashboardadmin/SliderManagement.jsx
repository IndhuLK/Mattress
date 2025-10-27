// src/dashboardadmin/SliderManagement.jsx
import React, { useState, useEffect } from "react";
import { useSlider } from "/src/dashboardadmin/SliderContext";

const SliderManagement = () => {
  const { sliderData, setSliderData } = useSlider();
  const [formData, setFormData] = useState(sliderData);
  
  useEffect(() => {
  setFormData(sliderData);
}, [sliderData]);

 const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (files && files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, [name]: reader.result }); // Base64 string
    };
    reader.readAsDataURL(files[0]);
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  const handleSave = () => {
    setSliderData(formData);
    alert("✅ Hero section updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#3d5f12]">
          🎨 Slider Management
        </h2>

        {/* Preview */}
        <div className="mb-6">
          <img
            src={formData.image}
            alt="Hero Preview"
            className="rounded-xl shadow-md w-full h-64 object-cover"
          />
        </div>

        {/* Form */}
        <div className="grid gap-4">
          <label className="font-semibold">Upload Hero Image</label>
          <input type="file" name="image" onChange={handleChange} />

          <label className="font-semibold">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />

          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />

          <label className="font-semibold">Button Text</label>
          <input
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />

          <label className="font-semibold">Offer Title</label>
          <input
            name="offerTitle"
            value={formData.offerTitle}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />

          <label className="font-semibold">Discount Text</label>
          <input
            name="discountText"
            value={formData.discountText}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />

          <label className="font-semibold">Countdown End Date</label>
          <input
            type="datetime-local"
            name="countdownDate"
            value={formData.countdownDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />

          <button
            onClick={handleSave}
            className="mt-4 bg-[#3d5f12] text-white px-6 py-2 rounded-md hover:bg-[#4f3b30]
             transition"
          >
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderManagement;
