"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  subscribeToAllOrders,
  updateOrderStatus,
} from "@/services/orderService";

const STATUS_COLUMNS = [
  {
    key: "pending",
    title: "Pending",
    color: "bg-yellow-500",
    emptyText: "No pending orders",
  },
  {
    key: "preparing",
    title: "Preparing",
    color: "bg-blue-500",
    emptyText: "No preparing orders",
  },
  {
    key: "out_for_delivery",
    title: "Out For Delivery",
    color: "bg-purple-500",
    emptyText: "No delivery orders",
  },
  {
    key: "delivered",
    title: "Delivered",
    color: "bg-green-500",
    emptyText: "No delivered orders",
  },
  {
    key: "cancelled",
    title: "Cancelled",
    color: "bg-red-500",
    emptyText: "No cancelled orders",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState("");
  const [search, setSearch] = useState("");
const [showOnlyActive, setShowOnlyActive] = useState(false);
const previousOrderIdsRef =
  useRef(new Set());

const hasMountedRef =
  useRef(false);
  const [selectedOrder, setSelectedOrder] =
  useState(null);

const [newOrderIds, setNewOrderIds] =
  useState([]);
  const playNewOrderSound = () => {
  try {
    const audio = new Audio(
      "/sounds/new-order.mp3"
    );

    audio.play().catch(() => {});
  } catch (error) {
    console.log(
      "Audio could not be played"
    );
  }
};
 useEffect(() => {
  const unsubscribe =
    subscribeToAllOrders(
      (ordersData) => {
        const safeOrders =
          ordersData || [];

        const currentIds =
          new Set(
            safeOrders.map(
              (order) => order.id
            )
          );

        if (
          hasMountedRef.current
        ) {
          const previousIds =
            previousOrderIdsRef.current;

          const justAddedOrders =
            safeOrders.filter(
              (order) =>
                !previousIds.has(
                  order.id
                )
            );

          if (
            justAddedOrders.length > 0
          ) {
            playNewOrderSound();

            setNewOrderIds(
              justAddedOrders.map(
                (order) => order.id
              )
            );

            setTimeout(() => {
              setNewOrderIds(
                []
              );
            }, 2 * 60 * 1000);
          }
        } else {
          hasMountedRef.current =
            true;
        }

        previousOrderIdsRef.current =
          currentIds;

        setOrders(safeOrders);
      }
    );

  return () => unsubscribe();
}, []);

  const filteredAndSortedOrders = useMemo(() => {
  let data = [...orders];

  const normalizedSearch =
    search.trim().toLowerCase();

  if (normalizedSearch) {
    data = data.filter((order) => {
      const orderId =
        order.id?.toLowerCase() || "";

      const customerName =
        order.customerName
          ?.toLowerCase() || "";

      const phone =
        order.phone?.toLowerCase() || "";

      return (
        orderId.includes(normalizedSearch) ||
        customerName.includes(normalizedSearch) ||
        phone.includes(normalizedSearch)
      );
    });
  }

  if (showOnlyActive) {
    data = data.filter(
      (order) =>
        order.status !== "delivered" &&
        order.status !== "cancelled"
    );
  }

  return data.sort((a, b) => {
    const aTime =
      a.createdAt?.seconds || 0;

    const bTime =
      b.createdAt?.seconds || 0;

    return bTime - aTime;
  });
}, [orders, search, showOnlyActive]);
 const groupedOrders = useMemo(() => {
  return {
    pending: filteredAndSortedOrders.filter(
      (order) => order.status === "pending"
    ),
    preparing: filteredAndSortedOrders.filter(
      (order) => order.status === "preparing"
    ),
    out_for_delivery:
      filteredAndSortedOrders.filter(
        (order) =>
          order.status === "out_for_delivery"
      ),
    delivered: filteredAndSortedOrders.filter(
      (order) => order.status === "delivered"
    ),
    cancelled: filteredAndSortedOrders.filter(
      (order) => order.status === "cancelled"
    ),
  };
}, [filteredAndSortedOrders]);

  const handleStatusChange = async (
  orderId,
  status
) => {
  try {
    setUpdatingId(orderId);

    await updateOrderStatus(
      orderId,
      status
    );

    setSelectedOrder((prev) =>
      prev && prev.id === orderId
        ? {
            ...prev,
            status,
          }
        : prev
    );
  } finally {
    setUpdatingId("");
  }
};

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "preparing":
        return "bg-blue-500";
      case "out_for_delivery":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-zinc-700";
    }
  };

  const getNextAction = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Start Preparing",
          nextStatus: "preparing",
          className: "bg-blue-500",
        };

      case "preparing":
        return {
          label: "Out For Delivery",
          nextStatus: "out_for_delivery",
          className: "bg-purple-500",
        };

      case "out_for_delivery":
        return {
          label: "Mark Delivered",
          nextStatus: "delivered",
          className: "bg-green-500",
        };

      default:
        return null;
    }
  };

  const formatOrderTime = (order) => {
    if (order.createdAt?.seconds) {
      return new Date(
        order.createdAt.seconds * 1000
      ).toLocaleString();
    }

    return "N/A";
  };
  const isFreshPendingOrder = (
  order
) => {
  if (
    order.status !== "pending"
  ) {
    return false;
  }

  if (
    !order.createdAt?.seconds
  ) {
    return false;
  }

  const orderTime =
    order.createdAt.seconds *
    1000;

  const now = Date.now();

  const diffInMinutes =
    (now - orderTime) /
    (1000 * 60);

  return diffInMinutes <= 2;
};

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Live Orders Board
            </h1>

            <p className="text-zinc-400 mt-2">
              Manage all restaurant orders in
              real time
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
              <p className="text-zinc-400 text-sm">
                Total Orders
              </p>
              <p className="text-2xl font-bold">
                {filteredAndSortedOrders.length}
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
              <p className="text-zinc-400 text-sm">
                Pending
              </p>
              <p className="text-2xl font-bold text-yellow-400">
                {
                  groupedOrders.pending
                    .length
                }
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
              <p className="text-zinc-400 text-sm">
                Preparing
              </p>
              <p className="text-2xl font-bold text-blue-400">
                {
                  groupedOrders.preparing
                    .length
                }
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
              <p className="text-zinc-400 text-sm">
                Out For Delivery
              </p>
              <p className="text-2xl font-bold text-purple-400">
                {
                  groupedOrders
                    .out_for_delivery
                    .length
                }
              </p>
            </div>
          </div>
        </div>
        {/* Search + Filters */}
<div className="mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
  <input
    type="text"
    placeholder="Search by Order ID / Customer Name / Phone"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="
      w-full
      lg:max-w-xl
      bg-zinc-900
      border
      border-zinc-800
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-orange-500
    "
  />

  <label className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 cursor-pointer">
    <input
      type="checkbox"
      checked={showOnlyActive}
      onChange={(e) =>
        setShowOnlyActive(
          e.target.checked
        )
      }
    />
    <span>Show only active orders</span>
  </label>
</div>
        {/* Empty state */}
        {orders.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
            No Orders Found
          </div>
        )}

        {/* Order Columns */}
        {orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 items-start">
            {STATUS_COLUMNS.map(
              (column) => {
                const columnOrders =
                  groupedOrders[
                    column.key
                  ] || [];

                return (
                  <div
                    key={column.key}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 min-h-[500px]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4 sticky top-0 bg-zinc-950 z-10 pb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${column.color}`}
                        />

                        <h2 className="text-lg font-bold">
                          {column.title}
                        </h2>
                      </div>

                      <span className="bg-zinc-800 text-sm px-3 py-1 rounded-full">
                        {
                          columnOrders.length
                        }
                      </span>
                    </div>

                    {/* Orders inside column */}
                    <div className="space-y-4">
                      {columnOrders.length ===
                        0 && (
                        <div className="text-zinc-500 text-sm bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                          {
                            column.emptyText
                          }
                        </div>
                      )}

                      {columnOrders.map(
                        (order) => {
                          const nextAction =
                            getNextAction(
                              order.status
                            );

                          return (
                            <div
  key={order.id}
  className={`
    bg-zinc-900
    border
    rounded-2xl
    p-4
    ${
      newOrderIds.includes(order.id) ||
      isFreshPendingOrder(order)
        ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
        : "border-zinc-800"
    }
  `}
>
                              {/* Top */}
                              <div className="flex items-start justify-between gap-3">
                                <div>
  <div className="flex items-center gap-2 flex-wrap">
    <h3 className="font-bold text-base break-all">
      #{order.id}
    </h3>

    {(newOrderIds.includes(order.id) ||
      isFreshPendingOrder(order)) && (
      <span
        className="
        bg-red-500
        text-white
        text-[10px]
        font-bold
        px-2
        py-1
        rounded-full
        animate-pulse
        "
      >
        NEW
      </span>
    )}
  </div>

  <p className="text-zinc-400 text-sm mt-1">
    {formatOrderTime(order)}
  </p>
</div>

                                <span
                                  className={`text-xs px-3 py-1 rounded-full ${getStatusBadgeClass(
                                    order.status
                                  )}`}
                                >
                                  {
                                    order.status
                                  }
                                </span>
                              </div>

                              {/* Customer */}
                              <div className="mt-4 space-y-1 text-sm">
                                <p>
                                  <span className="text-zinc-400">
                                    Customer:
                                  </span>{" "}
                                  {
                                    order.customerName
                                  }
                                </p>

                                <p>
                                  <span className="text-zinc-400">
                                    Phone:
                                  </span>{" "}
                                  {
                                    order.phone
                                  }
                                </p>

                                <p>
                                  <span className="text-zinc-400">
                                    Payment:
                                  </span>{" "}
                                  {
                                    order.paymentMethod
                                  }
                                </p>
                              </div>

                              {/* Address */}
                              {/* <div className="mt-4">
                                <p className="text-xs text-zinc-400 mb-1">
                                  Address
                                </p>

                                <p className="text-sm text-zinc-300 line-clamp-3">
                                  {
                                    order.address
                                  }
                                </p>
                              </div> */}

                              {/* Items */}
                              <div className="mt-4">
                                <p className="text-xs text-zinc-400 mb-2">
                                  Ordered Items
                                </p>

                                <div className="space-y-2">
                                  {order.items?.map(
                                    (
                                      item,
                                      index
                                    ) => (
                                      <div
                                        key={`${order.id}-${item.name}-${index}`}
                                        className="flex justify-between text-sm gap-2"
                                      >
                                        <span className="text-zinc-300">
                                          {
                                            item.name
                                          }{" "}
                                          ×{" "}
                                          {
                                            item.quantity
                                          }
                                        </span>

                                        <span className="font-medium whitespace-nowrap">
                                          ₹
                                          {item.price *
                                            item.quantity}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              {/* Bottom */}
                             <div className="mt-4 pt-4 border-t border-zinc-800">
  <div className="flex items-center justify-between mb-3">
    <p className="text-zinc-400 text-sm">
      Total
    </p>

    <p className="text-lg font-bold text-orange-400">
      ₹{order.total}
    </p>
  </div>

  <div className="flex flex-col gap-2">
    <button
      onClick={() =>
        setSelectedOrder(order)
      }
      className="
        w-full
        bg-zinc-800
        hover:bg-zinc-700
        px-4
        py-2
        rounded-xl
        font-medium
      "
    >
      View Details
    </button>

    {nextAction && (
      <button
        onClick={() =>
          handleStatusChange(
            order.id,
            nextAction.nextStatus
          )
        }
        disabled={updatingId === order.id}
        className={`${nextAction.className} px-4 py-2 rounded-xl font-medium disabled:opacity-60`}
      >
        {updatingId === order.id
          ? "Updating..."
          : nextAction.label}
      </button>
    )}

    {order.status !== "delivered" &&
      order.status !== "cancelled" && (
        <button
          onClick={() =>
            handleStatusChange(
              order.id,
              "cancelled"
            )
          }
          disabled={updatingId === order.id}
          className="bg-red-500 px-4 py-2 rounded-xl font-medium disabled:opacity-60"
        >
          Cancel Order
        </button>
      )}
  </div>
</div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
         {selectedOrder && (
  <div className="fixed inset-0 z-50 flex justify-end bg-black/60">
    <div className="w-full max-w-2xl h-full bg-zinc-950 border-l border-zinc-800 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800 px-6 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Order Details
          </h2>
          <p className="text-zinc-400 mt-1">
            #{selectedOrder.id}
          </p>
        </div>

        <button
          onClick={() =>
            setSelectedOrder(null)
          }
          className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl"
        >
          Close
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h3 className="text-lg font-bold mb-4">
            Order Summary
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-400">
                Customer Name
              </p>
              <p className="mt-1 font-medium">
                {selectedOrder.customerName}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Phone
              </p>
              <p className="mt-1 font-medium">
                {selectedOrder.phone}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Payment Method
              </p>
              <p className="mt-1 font-medium">
                {selectedOrder.paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Status
              </p>
              <p className="mt-1 font-medium">
                {selectedOrder.status}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Order Type
              </p>
              <p className="mt-1 font-medium">
                {selectedOrder.orderType || "delivery"}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Order Time
              </p>
              <p className="mt-1 font-medium">
                {formatOrderTime(
                  selectedOrder
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h3 className="text-lg font-bold mb-3">
            Delivery Address
          </h3>

          <p className="text-zinc-300 leading-7">
            {selectedOrder.address}
          </p>
        </div>

        {/* Ordered Items */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h3 className="text-lg font-bold mb-4">
            Ordered Items
          </h3>

          <div className="space-y-3">
            {selectedOrder.items?.map(
              (item, index) => (
                <div
                  key={`${selectedOrder.id}-${item.name}-${index}`}
                  className="flex justify-between items-start gap-3 border-b border-zinc-800 pb-3"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold whitespace-nowrap">
                    ₹
                    {item.price *
                      item.quantity}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Total */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <p className="text-lg font-semibold">
            Total Amount
          </p>

          <p className="text-2xl font-bold text-orange-400">
            ₹{selectedOrder.total}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h3 className="text-lg font-bold mb-4">
            Update Order Status
          </h3>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                handleStatusChange(
                  selectedOrder.id,
                  "pending"
                )
              }
              className="bg-yellow-500 px-4 py-2 rounded-xl"
            >
              Pending
            </button>

            <button
              onClick={() =>
                handleStatusChange(
                  selectedOrder.id,
                  "preparing"
                )
              }
              className="bg-blue-500 px-4 py-2 rounded-xl"
            >
              Preparing
            </button>

            <button
              onClick={() =>
                handleStatusChange(
                  selectedOrder.id,
                  "out_for_delivery"
                )
              }
              className="bg-purple-500 px-4 py-2 rounded-xl"
            >
              Out For Delivery
            </button>

            <button
              onClick={() =>
                handleStatusChange(
                  selectedOrder.id,
                  "delivered"
                )
              }
              className="bg-green-500 px-4 py-2 rounded-xl"
            >
              Delivered
            </button>

            <button
              onClick={() =>
                handleStatusChange(
                  selectedOrder.id,
                  "cancelled"
                )
              }
              className="bg-red-500 px-4 py-2 rounded-xl"
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}