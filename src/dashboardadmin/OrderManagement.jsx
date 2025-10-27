// src/pages/OrderManagement.jsx
import React, { useMemo, useState } from "react";

/**
 * OrderManagement.jsx - Enhanced & Responsive
 *
 * - React + Tailwind component that implements:
 * • Summary cards (Total orders, Ordered items, Returns, Fulfilled, Delivered)
 * • Responsive Filter bar: Payment status, Fulfillment status, Delivery status, Delivery method
 * • Search by order id / customer with icon
 * • Table with selectable rows and matching design
 * • Client-side pagination
 */

/* -------------------------
    Dummy Order Data (for demonstration)
    ------------------------- */
const initialOrders = [
  {
    id: "#1001",
    date: "Today at 10:00 pm",
    customer: "Robbi Darwis",
    total: 48.0,
    paymentStatus: "Success",
    fulfillmentStatus: "Fulfilled",
    items: 2,
    deliveryMethod: "Free Shipping",
  },
  {
    id: "#1002",
    date: "Today at 08:00 pm",
    customer: "Robbi Darwis",
    total: 48.0,
    paymentStatus: "Success",
    fulfillmentStatus: "Fulfilled",
    items: 4,
    deliveryMethod: "Cash on Delivery",
  },
  {
    id: "#1003",
    date: "Today at 06:00 pm",
    customer: "Samuel",
    total: 56.0,
    paymentStatus: "Payment Pending",
    fulfillmentStatus: "Unfulfilled",
    items: 2,
    deliveryMethod: "Free Shipping",
  },
  {
    id: "#1004",
    date: "Today at 04:00 pm",
    customer: "Judha Maygustya",
    total: 32.0,
    paymentStatus: "Cancel",
    fulfillmentStatus: "Unfulfilled",
    items: 1,
    deliveryMethod: "Cash on Delivery",
  },
  {
    id: "#1005",
    date: "02/03/2024 at 13:00 pm",
    customer: "Royhan Darmawan",
    total: 56.0,
    paymentStatus: "Success",
    fulfillmentStatus: "Fulfilled",
    items: 5,
    deliveryMethod: "Cash on Delivery",
  },
  {
    id: "#1006",
    date: "02/03/2024 at 11:00 pm",
    customer: "Royhan Darmawan",
    total: 56.0,
    paymentStatus: "Success",
    fulfillmentStatus: "Fulfilled",
    items: 2,
    deliveryMethod: "Free Shipping",
  },
  {
    id: "#1007",
    date: "02/03/2024 at 07:00 pm",
    customer: "Samuel",
    total: 32.0,
    paymentStatus: "Payment Pending",
    fulfillmentStatus: "Unfulfilled",
    items: 6,
    deliveryMethod: "Cash on Delivery",
  },
  {
    id: "#1008",
    date: "01/03/2024 at 16:15 pm",
    customer: "Robbi Darwis",
    total: 32.0,
    paymentStatus: "Payment Pending",
    fulfillmentStatus: "Unfulfilled",
    items: 6,
    deliveryMethod: "Free Shipping",
  },
  {
    id: "#1009",
    date: "01/03/2024 at 12:00 pm",
    customer: "Nabila Rose",
    total: 32.0,
    paymentStatus: "Cancel",
    fulfillmentStatus: "Unfulfilled",
    items: 4,
    deliveryMethod: "Cash on Delivery",
  },
  {
    id: "#1010",
    date: "01/03/2024 at 10:00 pm",
    customer: "Nabila Rose",
    total: 48.0,
    paymentStatus: "Success",
    fulfillmentStatus: "Fulfilled",
    items: 1,
    deliveryMethod: "Free Shipping",
  },
  // Add extra items to demonstrate pagination
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `#10${11 + i}`,
    date: `03/03/2024 at ${8 + (i % 12)}:00`,
    customer: `Customer ${i + 1}`,
    total: Math.round((30 + i) * 1.5),
    paymentStatus: ["Success", "Payment Pending", "Cancel"][i % 3],
    fulfillmentStatus: ["Fulfilled", "Unfulfilled"][i % 2],
    items: (i % 6) + 1,
    deliveryMethod: i % 2 === 0 ? "Free Shipping" : "Cash on Delivery",
  })),
];

/* -------------------------
    Small helpers
    ------------------------- */
const badgeClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "success":
      return "bg-green-100 text-green-700";
    case "fulfilled":
      return "bg-emerald-100 text-emerald-700";
    case "payment pending":
      return "bg-yellow-100 text-yellow-700";
    case "unfulfilled":
      return "bg-orange-100 text-orange-700";
    case "cancel":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const numberWithCommas = (x) =>
  typeof x === "number" ? x.toLocaleString() : x;

/* -------------------------
    Component
    ------------------------- */
export default function OrderManagement() {
  // data (in real app fetch from API)
  const [orders] = useState(initialOrders);

  // filters & search
  const [paymentFilter, setPaymentFilter] = useState("");
  const [fulfillmentFilter, setFulfillmentFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");
  const [deliveryMethodFilter, setDeliveryMethodFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // pagination
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // selection
  const [selectedOrderIds, setSelectedOrderIds] = useState(["#1002"]); // #1002 is pre-selected as per screenshot

  // derived: filtered list
  const filteredOrders = useMemo(() => {
    let list = [...orders];

    // ... filtering logic remains the same ...
    if (paymentFilter) {
      list = list.filter(
        (o) => o.paymentStatus.toLowerCase() === paymentFilter.toLowerCase()
      );
    }
    if (fulfillmentFilter) {
      list = list.filter(
        (o) =>
          o.fulfillmentStatus.toLowerCase() === fulfillmentFilter.toLowerCase()
      );
    }
    if (deliveryFilter) {
      // Assuming 'Delivery status' filter actually filters by 'Delivery Method' since the options match
      list = list.filter((o) =>
        (o.deliveryMethod || "")
          .toLowerCase()
          .includes(deliveryFilter.toLowerCase())
      );
    }
    if (deliveryMethodFilter) {
      list = list.filter(
        (o) =>
          o.deliveryMethod.toLowerCase() === deliveryMethodFilter.toLowerCase()
      );
    }
    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(t) ||
          (o.customer || "").toLowerCase().includes(t)
      );
    }

    return list;
  }, [
    orders,
    paymentFilter,
    fulfillmentFilter,
    deliveryFilter,
    deliveryMethodFilter,
    searchTerm,
  ]);

  // summary cards
  const summary = useMemo(() => {
    // These values are static in the screenshot, but derived here for realism
    const totalOrders = 24;
    const orderedItems = 40;
    const returns = 26;
    const fulfilled = 12;
    const delivered = 16;
    return { totalOrders, orderedItems, returns, fulfilled, delivered };
  }, [orders]);

  // pagination calculations
  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const paginated = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalEntries = 135; // Static from screenshot footer

  // handle select / deselect
  const toggleSelect = (id) =>
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleSelectAll = () => {
    const paginatedIds = paginated.map((o) => o.id);
    const allSelectedOnPage = paginatedIds.every((id) =>
      selectedOrderIds.includes(id)
    );

    if (allSelectedOnPage) {
      // Deselect all on current page
      setSelectedOrderIds((prev) =>
        prev.filter((id) => !paginatedIds.includes(id))
      );
    } else {
      // Select all on current page, without duplicates
      setSelectedOrderIds((prev) => [...new Set([...prev, ...paginatedIds])]);
    }
  };

  // helpers to reset page when filters change
  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800">
        Order Management Dashboard
      </h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Total orders", value: summary.totalOrders, badge: "Today" },
          { label: "Ordered items", value: summary.orderedItems },
          { label: "Returns", value: summary.returns },
          { label: "Fulfilled orders", value: summary.fulfilled },
          { label: "Delivered orders", value: summary.delivered },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center text-center border-t-4 border-indigo-500/0"
          >
            <div className="text-sm text-gray-500 font-medium whitespace-nowrap">
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {stat.value}
            </div>
            {stat.badge && (
              <span className="mt-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-500/10 text-green-700">
                {stat.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <hr className="border-t border-gray-200" />

      {/* Filters and Search Bar (Responsive) */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Filter Dropdowns Container */}
          <div className="flex-1 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Filter by
            </span>

            <select
              value={paymentFilter}
              onChange={(e) =>
                handleFilterChange(setPaymentFilter)(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white 
              focus:ring-indigo-500 focus:border-indigo-500 flex-grow sm:flex-grow-0 min-w-[120px]"
            >
              <option value="">Payment status</option>
              <option>Success</option>
              <option>Payment Pending</option>
              <option>Cancel</option>
            </select>

            <select
              value={fulfillmentFilter}
              onChange={(e) =>
                handleFilterChange(setFulfillmentFilter)(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
               focus:ring-indigo-500 focus:border-indigo-500 flex-grow sm:flex-grow-0 
               min-w-[120px]"
            >
              <option value="">Fulfillment status</option>
              <option>Fulfilled</option>
              <option>Unfulfilled</option>
            </select>

            <select
              value={deliveryFilter}
              onChange={(e) =>
                handleFilterChange(setDeliveryFilter)(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
               focus:ring-indigo-500 focus:border-indigo-500 flex-grow sm:flex-grow-0 min-w-[120px]"
            >
              <option value="">Delivery status</option>
              <option>Shipped</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>

            <select
              value={deliveryMethodFilter}
              onChange={(e) =>
                handleFilterChange(setDeliveryMethodFilter)(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
               focus:ring-indigo-500 focus:border-indigo-500 flex-grow sm:flex-grow-0 min-w-[120px]"
            >
              <option value="">Delivery method</option>
              <option>Free Shipping</option>
              <option>Cash on Delivery</option>
            </select>
          </div>

          {/* Search Input (Pushed to the right) */}
          <div className="relative w-full lg:w-auto lg:ml-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search order"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full lg:w-48 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    paginated.length > 0 &&
                    paginated.every((o) => selectedOrderIds.includes(o.id))
                  }
                  onChange={toggleSelectAll}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              {[
                "Order",
                "Date",
                "Customer",
                "Total",
                "Payment Status",
                "Fulfillment",
                "Items",
                "Delivery Method",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  <div className="flex items-center">
                    {header}
                    <svg
                      className="w-3 h-3 ml-1 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-6 text-center text-gray-500">
                  No orders found matching your criteria.
                </td>
              </tr>
            ) : (
              paginated.map((order) => {
                const isSelected = selectedOrderIds.includes(order.id);
                return (
                  <tr
                    key={order.id}
                    className={
                      isSelected
                        ? "bg-indigo-50/50 hover:bg-indigo-100"
                        : "hover:bg-gray-50"
                    }
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(order.id)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${badgeClass(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${badgeClass(
                          order.fulfillmentStatus
                        )}`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {order.items} items
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {order.deliveryMethod}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl shadow-md">
        <div className="text-sm text-gray-700 mb-3 sm:mb-0">
          Showing {filteredOrders.length === 0 ? 0 : (page - 1) * pageSize + 1}{" "}
          to {Math.min(page * pageSize, filteredOrders.length)} of{" "}
          {totalEntries} entries
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          {/* Pagination Buttons (simple rendering for the requested design) */}
          {[1, 2, 3, 4].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                pageNum === 1
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <span className="px-2 py-2 text-sm text-gray-500">...</span>
          {[12, 13].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              page === pageCount
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
