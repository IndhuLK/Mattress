import React, { useState, useEffect } from "react";
import { db, storage } from "/src/config/firebase"; // ✅ Firestore + Storage import
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SliderManagement = () => {
  const [sliders, setSliders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    button: "",
    image: null,
    imagePreview: "",
    imageUrl: "",
    startTime: "",
    endTime: "",
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
    offerTitle: "",
    offerText: "",
  });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Sliders in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "sliders"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSliders(list);
    });
    return () => unsub();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      const file = files[0];
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Calculate timer values
  const handleEndDate = (e) => {
    handleChange(e);
    const start = new Date(form.startTime);
    const end = new Date(e.target.value);
    if (start && end && end > start) {
      const diff = end - start;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setForm((prev) => ({ ...prev, days, hours, minutes, seconds }));
    }
  };

  // ✅ Add or Update Slider
  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.button) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = form.imageUrl;

      // ✅ If a new image is uploaded
      if (form.image) {
        const storageRef = ref(storage, `sliders/${form.image.name}_${Date.now()}`);
        await uploadBytes(storageRef, form.image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const sliderData = {
        ...form,
        imageUrl,
        imagePreview: imageUrl,
        createdAt: new Date().toISOString(),
      };

      delete sliderData.image; // don’t store file object

      if (editId) {
        await updateDoc(doc(db, "sliders", editId), sliderData);
      } else {
        await addDoc(collection(db, "sliders"), sliderData);
      }

      resetForm();
      setShowPopup(false);
    } catch (err) {
      console.error("❌ Error saving slider:", err);
      alert("Failed to save slider!");
    }
    setLoading(false);
  };

  // ✅ Delete slider
  const confirmAndDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteDoc(doc(db, "sliders", deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  const handleEdit = (slider) => {
    setForm(slider);
    setEditId(slider.id);
    setShowPopup(true);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      button: "",
      image: null,
      imagePreview: "",
      imageUrl: "",
      startTime: "",
      endTime: "",
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
      offerTitle: "",
      offerText: "",
    });
    setEditId(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🔥 Slider Management (Firebase)</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Slider
        </button>
      </div>

      {/* ✅ Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => {
                setShowPopup(false);
                resetForm();
              }}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Slider" : "Add New Slider"}
            </h2>

            <div className="space-y-4">
              {/* Title & Description */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="font-medium">Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Enter title"
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium">Description</label>
                  <input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Enter description"
                  />
                </div>
              </div>

              {/* Button & Image */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="font-medium">Button Text</label>
                  <input
                    name="button"
                    value={form.button}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="e.g., Shop Now"
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium">Image Upload</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {form.imagePreview && (
                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      className="mt-2 w-[120px] h-[70px] object-cover rounded border"
                    />
                  )}
                </div>
              </div>

              {/* Offer Section */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="font-medium">Offer Title</label>
                  <input
                    name="offerTitle"
                    value={form.offerTitle}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Special Offer!"
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium">Offer Text</label>
                  <input
                    name="offerText"
                    value={form.offerText}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Limited Time Only!"
                  />
                </div>
              </div>

              {/* Timer */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm">Start Time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                </div>
                <div>
                  <label className="text-sm">End Time</label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleEndDate}
                    className="border px-2 py-1 rounded w-full"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-3 disabled:opacity-70"
              >
                {loading ? "Saving..." : editId ? "Update Slider" : "Add Slider"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ List of Sliders */}
      <div className="space-y-4 mt-6">
        {sliders.length === 0 ? (
          <p>No sliders added yet.</p>
        ) : (
          sliders.map((s) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded-lg flex justify-between items-center shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={s.imagePreview}
                  alt={s.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.description}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(s.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Delete Confirm Popup */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <h2 className="font-semibold mb-4">Delete this slider?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmAndDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderManagement;
