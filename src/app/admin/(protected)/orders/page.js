"use client";

import {
  useEffect,
  useMemo,
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
    emptyText:
      "No pending orders",
  },
  {
    key: "accepted",
    title: "Accepted",
    color: "bg-orange-500",
    emptyText:
      "No accepted orders",
  },
  {
    key: "preparing",
    title: "Preparing",
    color: "bg-blue-500",
    emptyText:
      "No preparing orders",
  },
  {
    key: "out_for_delivery",
    title: "Out For Delivery",
    color: "bg-purple-500",
    emptyText:
      "No delivery orders",
  },
  {
    key: "delivered",
    title: "Delivered",
    color: "bg-green-500",
    emptyText:
      "No delivered orders",
  },
  {
    key: "cancelled",
    title: "Cancelled",
    color: "bg-red-500",
    emptyText:
      "No cancelled orders",
  },
];

export default function AdminOrdersPage() {

  const [activeStatus, setActiveStatus] =
    useState("pending");

  const [orders, setOrders] =
    useState([]);

  const [updatingId, setUpdatingId] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [showOnlyActive, setShowOnlyActive] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  useEffect(() => {
    const unsubscribe =
      subscribeToAllOrders(
        (ordersData) => {
          setOrders(
            ordersData || []
          );
        }
      );

    return () => unsubscribe();
  }, []);

  const filteredAndSortedOrders =
    useMemo(() => {
      let data = [...orders];

      // Show only today's orders
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      data = data.filter((order) => {
        if (!order.createdAt?.seconds) return false;

        const orderDate = new Date(
          order.createdAt.seconds * 1000
        );

        return (
          orderDate >= today &&
          orderDate < tomorrow
        );
      });

      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      if (normalizedSearch) {
        data = data.filter(
          (order) => {
            const orderId =
              order.id?.toLowerCase() ||
              "";

            const customerName =
              order.customerName?.toLowerCase() ||
              "";

            const phone =
              order.phone?.toLowerCase() ||
              "";

            return (
              orderId.includes(
                normalizedSearch
              ) ||
              customerName.includes(
                normalizedSearch
              ) ||
              phone.includes(
                normalizedSearch
              )
            );
          }
        );
      }

      if (showOnlyActive) {
        data = data.filter(
          (order) =>
            order.status !==
            "delivered" &&
            order.status !==
            "cancelled"
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
  const handleCallCustomer = (
    phone
  ) => {
    if (!phone) {
      alert("Phone number not available");
      return;
    }

    window.location.href = `tel:${phone}`;
  };

  const handleCopyAddress = async (
    address
  ) => {
    if (!address) {
      alert("Address not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(
        address
      );

      alert("Address copied");
    } catch {
      alert("Unable to copy address");
    }
  };

  const handleOpenLocation = (
    latitude,
    longitude,
    address
  ) => {
    if (latitude && longitude) {
      window.open(
        `https://www.google.com/maps?q=${latitude},${longitude}`,
        "_blank"
      );
      return;
    }

    if (address) {
      const encodedAddress =
        encodeURIComponent(address);

      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        "_blank"
      );
      return;
    }

    alert("Location not available");
  };
  const groupedOrders =
    useMemo(() => {
      return {
        pending:
          filteredAndSortedOrders.filter(
            (order) =>
              order.status ===
              "pending"
          ),

        accepted:
          filteredAndSortedOrders.filter(
            (order) =>
              order.status ===
              "accepted"
          ),

        preparing:
          filteredAndSortedOrders.filter(
            (order) =>
              order.status ===
              "preparing"
          ),

        out_for_delivery:
          filteredAndSortedOrders.filter(
            (order) =>
              order.status ===
              "out_for_delivery"
          ),

        delivered:
          filteredAndSortedOrders.filter(
            (order) =>
              order.status ===
              "delivered"
          ),

        cancelled:
          filteredAndSortedOrders.filter(
            (order) =>
              order.status ===
              "cancelled"
          ),


      };
    }, [filteredAndSortedOrders]);

  const activeOrders =
    groupedOrders[
    activeStatus
    ] || [];

  const handleStatusChange =
    async (
      orderId,
      status
    ) => {
      try {
        setUpdatingId(orderId);

        const result =
          await updateOrderStatus(
            orderId,
            status
          );

        if (!result.success) {
          alert(
            result.error ||
            "Failed to update order status"
          );
          return;
        }

        setSelectedOrder((prev) =>
          prev &&
            prev.id === orderId
            ? {
              ...prev,
              status,
              ...(status !==
                "pending"
                ? {
                  isNewForAdmin:
                    false,
                }
                : {}),
            }
            : prev
        );
      } finally {
        setUpdatingId("");
      }
    };

  const getStatusBadgeClass = (
    status
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";

      case "accepted":
        return "bg-orange-500";

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

  const getNextAction = (
    status
  ) => {
    switch (status) {
      case "pending":
        return {
          label: "Accept Order",
          nextStatus:
            "accepted",
          className:
            "bg-orange-500",
        };

      case "accepted":
        return {
          label:
            "Start Preparing",
          nextStatus:
            "preparing",
          className:
            "bg-blue-500",
        };

      case "preparing":
        return {
          label:
            "Out For Delivery",
          nextStatus:
            "out_for_delivery",
          className:
            "bg-purple-500",
        };

      case "out_for_delivery":
        return {
          label:
            "Mark Delivered",
          nextStatus:
            "delivered",
          className:
            "bg-green-500",
        };

      default:
        return null;
    }
  };

  const formatOrderTime = (
    order
  ) => {
    if (
      order.createdAt?.seconds
    ) {
      return new Date(
        order.createdAt.seconds *
        1000
      ).toLocaleString();
    }

    return "N/A";
  };

  const isFreshPendingOrder = (
    order
  ) => {
    if (
      order.status !==
      "pending"
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl lg:text-4xl md:text-5xl font-bold">
              Live Orders Board
            </h1>

            <p className="text-zinc-400 lg:mt-2 mt-1 sm:text-sm">
              Manage all restaurant orders in real time
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-2">
              <p className="text-zinc-500 text-[10px] md:text-sm truncate">
                Total Orders
              </p>
              <p className="text-lg md:text-2xl font-bold">
                {
                  filteredAndSortedOrders.length
                }
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
                Accepted
              </p>
              <p className="text-2xl font-bold text-orange-400">
                {
                  groupedOrders.accepted
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

        {/* Search + Filter */}
        <div className=" mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search by Order ID / Customer Name / Phone"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
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
              checked={
                showOnlyActive
              }
              onChange={(e) =>
                setShowOnlyActive(
                  e.target.checked
                )
              }
            />
            <span>
              Show only active orders
            </span>
          </label>
        </div>

        {/* Empty State */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {STATUS_COLUMNS.map((status) => {
              const count =
                groupedOrders[status.key]
                  ?.length || 0;

              return (
                <button
                  key={status.key}
                  onClick={() => setActiveStatus(status.key)}
                  className={`
    py-3 px-2
    rounded-xl
    text-sm
    font-medium
    transition-all
    ${activeStatus === status.key
                      ? `${status.color} text-white`
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                    }
  `}
                >
                  <div>{status.title}</div>
                  <div className="text-xs mt-1">
                    ({count})
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Columns */}
        {orders.length > 0 && (
          <div className="space-y-4">
            {activeOrders.map(
              (order) => {
                const nextAction =
                  getNextAction(
                    order.status
                  );

                return (
                  <div
                    key={order.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">
                          #{order.id}
                        </h3>

                        <p className="text-zinc-400 text-sm">
                          {order.customerName}
                        </p>

                        <p className="text-zinc-500 text-xs">
                          {formatOrderTime(
                            order
                          )}
                        </p>
                      </div>

                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                        <p className="text-orange-400 font-bold mt-2">
                          ₹{order.total}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3 flex-wrap">
                      <button
                        onClick={() =>
                          setSelectedOrder(
                            order
                          )
                        }
                        className="bg-zinc-800 px-4 py-2 rounded-xl"
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
                          className={`${nextAction.className} px-4 py-2 rounded-xl`}
                        >
                          {nextAction.label}
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* Order Details Drawer */}
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
                  #
                  {
                    selectedOrder.id
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(
                    null
                  )
                }
                className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary */}
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
                      {
                        selectedOrder.customerName
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400">
                      Phone
                    </p>
                    <p className="mt-1 font-medium">
                      {
                        selectedOrder.phone
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400">
                      Payment Method
                    </p>
                    <p className="mt-1 font-medium">
                      {
                        selectedOrder.paymentMethod
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400">
                      Status
                    </p>
                    <p className="mt-1 font-medium">
                      {
                        selectedOrder.status
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400">
                      Order Type
                    </p>
                    <p className="mt-1 font-medium">
                      {selectedOrder.orderType ||
                        "delivery"}
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

              {/* Address */}
              {/* Delivery Address */}
              {/* Delivery Address */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <h3 className="text-lg font-bold mb-3">
                  Delivery Address
                </h3>

                <p className="text-zinc-300 leading-7">
                  {selectedOrder.address}
                </p>

                {(selectedOrder.latitude &&
                  selectedOrder.longitude) && (
                    <p className="text-sm text-green-400 mt-3">
                      Exact customer location available
                    </p>
                  )}

                <div className="mt-5 grid sm:grid-cols-3 gap-3">
                  <button
                    onClick={() =>
                      handleCallCustomer(
                        selectedOrder.phone
                      )
                    }
                    className="
        bg-green-500
        hover:bg-green-600
        px-4
        py-3
        rounded-xl
        font-medium
      "
                  >
                    Call Customer
                  </button>

                  <button
                    onClick={() =>
                      handleOpenLocation(
                        selectedOrder.latitude,
                        selectedOrder.longitude,
                        selectedOrder.address
                      )
                    }
                    className="
        bg-blue-500
        hover:bg-blue-600
        px-4
        py-3
        rounded-xl
        font-medium
      "
                  >
                    Open Location
                  </button>

                  <button
                    onClick={() =>
                      handleCopyAddress(
                        selectedOrder.address
                      )
                    }
                    className="
        bg-zinc-800
        hover:bg-zinc-700
        px-4
        py-3
        rounded-xl
        font-medium
      "
                  >
                    Copy Address
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <h3 className="text-lg font-bold mb-4">
                  Ordered Items
                </h3>

                <div className="space-y-3">
                  {selectedOrder.items?.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={`${selectedOrder.id}-${item.name}-${index}`}
                        className="flex justify-between items-start gap-3 border-b border-zinc-800 pb-3"
                      >
                        <div>
                          <p className="font-medium">
                            {
                              item.name
                            }
                          </p>
                          <p className="text-sm text-zinc-400 mt-1">
                            Quantity:{" "}
                            {
                              item.quantity
                            }
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
                  ₹
                  {
                    selectedOrder.total
                  }
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
                        "accepted"
                      )
                    }
                    className="bg-orange-500 px-4 py-2 rounded-xl"
                  >
                    Accept Order
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