import React, { useState, useEffect, useMemo } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Search, Filter, Edit, Trash2 } from "lucide-react";

/**
 * WhatsappEnquiry.jsx - WhatsApp Order Enquiries Management
 * 
 * Displays and manages orders initiated via WhatsApp "Buy Now" button
 * Features: View, Edit, Update Status (dropdown), Delete enquiries
 */

const WhatsappEnquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [editingEnquiry, setEditingEnquiry] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({
        customerName: "",
        customerPhone: "",
        customerAddress: ""
    });

    // Fetch enquiries from Firestore
    const fetchEnquiries = async () => {
        try {
            const q = query(
                collection(db, "whatsappOrders"),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);

            const enquiriesList = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    orderId: data.orderId || "N/A",
                    invoiceId: data.invoiceId || "N/A",
                    date: data.createdAt
                        ? new Date(data.createdAt.seconds * 1000).toLocaleString("en-IN", {
                            dateStyle: "short",
                            timeStyle: "short",
                        })
                        : "N/A",
                    productTitle: data.product?.title || data.items?.[0]?.title || "N/A",
                    productSku: data.product?.sku || data.items?.[0]?.sku || "N/A",
                    size: data.product?.size || data.items?.[0]?.size || "N/A",
                    thickness: data.product?.thickness || data.items?.[0]?.thickness || "N/A",
                    quantity: data.quantity || data.itemCount || 0,
                    total: data.total || 0,
                    customerName: data.customer?.name || "Not Provided",
                    customerPhone: data.customer?.phone || "Not Provided",
                    customerAddress: data.customer?.address || "Not Provided",
                    status: data.status || "WhatsApp Pending",
                    orderSource: data.orderSource || "WhatsApp",
                    paymentStatus: data.paymentStatus || "Unpaid",
                };
            });

            setEnquiries(enquiriesList);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    // Handle status update
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const docRef = doc(db, "whatsappOrders", id);
            await updateDoc(docRef, {
                status: newStatus,
                updatedAt: new Date()
            });

            // Refresh enquiries
            await fetchEnquiries();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("❌ Failed to update status. Please try again.");
        }
    };

    // Handle delete
    const handleDelete = async (id, orderId) => {
        if (window.confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
            try {
                await deleteDoc(doc(db, "whatsappOrders", id));
                await fetchEnquiries();
                alert("✅ Order deleted successfully!");
            } catch (error) {
                console.error("Error deleting order:", error);
                alert("❌ Failed to delete order. Please try again.");
            }
        }
    };

    // Handle edit modal open
    const handleEditOpen = (enquiry) => {
        setEditingEnquiry(enquiry);
        setEditForm({
            customerName: enquiry.customerName === "Not Provided" ? "" : enquiry.customerName,
            customerPhone: enquiry.customerPhone === "Not Provided" ? "" : enquiry.customerPhone,
            customerAddress: enquiry.customerAddress === "Not Provided" ? "" : enquiry.customerAddress
        });
        setShowEditModal(true);
    };

    // Handle edit save
    const handleEditSave = async () => {
        if (!editForm.customerPhone.trim()) {
            alert("⚠️ Phone number is required!");
            return;
        }

        try {
            const docRef = doc(db, "whatsappOrders", editingEnquiry.id);
            await updateDoc(docRef, {
                customer: {
                    name: editForm.customerName.trim() || "Not Provided",
                    phone: editForm.customerPhone.trim(),
                    address: editForm.customerAddress.trim() || "Not Provided"
                },
                updatedAt: new Date()
            });

            await fetchEnquiries();
            setShowEditModal(false);
            setEditingEnquiry(null);
            alert("✅ Customer details updated successfully!");
        } catch (error) {
            console.error("Error updating customer details:", error);
            alert("❌ Failed to update. Please try again.");
        }
    };

    // Filter enquiries based on search and status
    const filteredEnquiries = useMemo(() => {
        let list = [...enquiries];

        if (statusFilter) {
            list = list.filter((e) => e.status === statusFilter);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            list = list.filter(
                (e) =>
                    e.orderId.toLowerCase().includes(term) ||
                    e.productTitle.toLowerCase().includes(term) ||
                    e.customerName.toLowerCase().includes(term) ||
                    e.customerPhone.toLowerCase().includes(term)
            );
        }

        return list;
    }, [enquiries, statusFilter, searchTerm]);

    // Pagination
    const pageCount = Math.max(1, Math.ceil(filteredEnquiries.length / pageSize));
    const paginated = filteredEnquiries.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-6">
            {loading ? (
                <div className="text-center py-20">
                    <p className="text-gray-600">Loading enquiries...</p>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">
                                WhatsApp Enquiries
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {filteredEnquiries.length} total enquir{filteredEnquiries.length === 1 ? "y" : "ies"}
                            </p>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            {/* Status Filter */}
                            <div className="flex items-center gap-3">
                                <Filter size={18} className="text-gray-500" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setPage(1);
                                    }}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white 
                    focus:ring-indigo-500 focus:border-indigo-500 min-w-[150px]"
                                >
                                    <option value="">All Status</option>
                                    <option value="WhatsApp Pending">WhatsApp Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            {/* Search */}
                            <div className="relative w-full lg:w-auto lg:ml-auto">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by Order ID, Product or Phone"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full lg:w-80 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Enquiries Table */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {[
                                            "Order ID",
                                            "Date",
                                            "Product",
                                            "Qty",
                                            "Total",
                                            "Customer & Phone",
                                            "Address",
                                            "Payment",
                                            "Status",
                                            "Actions",
                                        ].map((header) => (
                                            <th
                                                key={header}
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginated.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={10}
                                                className="p-6 text-center text-gray-500"
                                            >
                                                No enquiries found matching your criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginated.map((enquiry) => (
                                            <tr
                                                key={enquiry.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-indigo-600">
                                                        {enquiry.orderId}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {enquiry.invoiceId}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {enquiry.date}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {enquiry.productTitle}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {enquiry.size} | {enquiry.thickness}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                                    {enquiry.quantity}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                                                    ₹{enquiry.total.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="text-sm text-gray-900 font-medium">
                                                        {enquiry.customerName}
                                                    </div>
                                                    <div className="text-sm text-indigo-600 font-semibold">
                                                        📞 {enquiry.customerPhone}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 max-w-xs">
                                                    <div className="text-sm text-gray-700 truncate">
                                                        {enquiry.customerAddress === "Not Provided" ? (
                                                            <span className="text-gray-400 italic">Not Provided</span>
                                                        ) : (
                                                            enquiry.customerAddress
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${enquiry.paymentStatus === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-orange-100 text-orange-700"
                                                            }`}
                                                    >
                                                        {enquiry.paymentStatus}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <select
                                                        value={enquiry.status}
                                                        onChange={(e) => handleStatusUpdate(enquiry.id, e.target.value)}
                                                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${enquiry.status === "Confirmed"
                                                            ? "bg-green-50 text-green-700 border-green-300"
                                                            : enquiry.status === "Cancelled"
                                                                ? "bg-red-50 text-red-700 border-red-300"
                                                                : "bg-yellow-50 text-yellow-700 border-yellow-300"
                                                            }`}
                                                    >
                                                        <option value="WhatsApp Pending">Pending</option>
                                                        <option value="Confirmed">Confirmed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => handleEditOpen(enquiry)}
                                                            className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition"
                                                            title="Edit Customer Details"
                                                        >
                                                            <Edit size={14} className="inline" /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(enquiry.id, enquiry.orderId)}
                                                            className="px-2 py-1 text-xs font-medium bg-red-50 text-red-700 rounded hover:bg-red-100 transition"
                                                            title="Delete Order"
                                                        >
                                                            <Trash2 size={14} className="inline" /> Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl shadow-md">
                        <div className="text-sm text-gray-700 mb-3 sm:mb-0">
                            Showing{" "}
                            {filteredEnquiries.length === 0
                                ? 0
                                : (page - 1) * pageSize + 1}{" "}
                            to {Math.min(page * pageSize, filteredEnquiries.length)} of{" "}
                            {filteredEnquiries.length} entries
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${page === 1
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-700 border hover:bg-gray-50"
                                    }`}
                            >
                                Previous
                            </button>

                            <span className="px-4 py-2 text-sm text-gray-700">
                                Page {page} of {pageCount}
                            </span>

                            <button
                                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                                disabled={page === pageCount}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${page === pageCount
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Edit Customer Details
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Order: {editingEnquiry?.orderId}
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    value={editForm.customerName}
                                    onChange={(e) => setEditForm({ ...editForm, customerName: e.target.value })}
                                    placeholder="Enter customer name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={editForm.customerPhone}
                                    onChange={(e) => setEditForm({ ...editForm, customerPhone: e.target.value })}
                                    placeholder="Enter phone number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    value={editForm.customerAddress}
                                    onChange={(e) => setEditForm({ ...editForm, customerAddress: e.target.value })}
                                    placeholder="Enter customer address"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleEditSave}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingEnquiry(null);
                                }}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
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

export default WhatsappEnquiry;
