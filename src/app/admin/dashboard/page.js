"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import {
  subscribeToAllOrders,
} from "@/services/orderService";

import {
  getAllUsers,
} from "@/services/userService";

import {
  getAllMenuItems,
} from "@/services/menuService";

export default function AdminDashboard() {
  const { user } =
    useSelector(
      (state) => state.auth
    );

  const [orders, setOrders] =
    useState([]);

  const [totalRevenue,
    setTotalRevenue] =
    useState(0);

  const [totalUsers,
    setTotalUsers] =
    useState(0);

  const [deliveryRevenue,
    setDeliveryRevenue] =
    useState(0);

  const [pendingOrders,
    setPendingOrders] =
    useState(0);

  const [preparingOrders,
    setPreparingOrders] =
    useState(0);

  const [outForDeliveryOrders,
    setOutForDeliveryOrders] =
    useState(0);

  const [deliveredOrders,
    setDeliveredOrders] =
    useState(0);

  const [cancelledOrders,
    setCancelledOrders] =
    useState(0);

  const [walkInRevenue,
    setWalkInRevenue] =
    useState(0);

  const [cashRevenue,
    setCashRevenue] =
    useState(0);

  const [onlineRevenue,
    setOnlineRevenue] =
    useState(0);

  const [menuCount,
    setMenuCount] =
    useState(0);

  const [topItem,
    setTopItem] =
    useState("No Sales");

  const [todayRevenue,
    setTodayRevenue] =
    useState(0);

  useEffect(() => {
    loadUsersAndMenu();

    const unsubscribe =
      subscribeToAllOrders(
        (ordersData) => {
          updateDashboardFromOrders(
            ordersData
          );
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  const loadUsersAndMenu =
    async () => {
      const userResult =
        await getAllUsers();

      const menuResult =
        await getAllMenuItems();

      if (
        userResult.success
      ) {
        setTotalUsers(
          userResult.users.length
        );
      }

      if (
        menuResult.success
      ) {
        setMenuCount(
          menuResult.data.length
        );
      }
    };

  const updateDashboardFromOrders = (
    ordersData
  ) => {
    const orders =
      ordersData || [];

    setOrders(orders);

    // Order counts
    setPendingOrders(
      orders.filter(
        (o) =>
          o.status ===
          "pending"
      ).length
    );

    setPreparingOrders(
      orders.filter(
        (o) =>
          o.status ===
          "preparing"
      ).length
    );

    setOutForDeliveryOrders(
      orders.filter(
        (o) =>
          o.status ===
          "out_for_delivery"
      ).length
    );

    setDeliveredOrders(
      orders.filter(
        (o) =>
          o.status ===
          "delivered"
      ).length
    );

    setCancelledOrders(
      orders.filter(
        (o) =>
          o.status ===
          "cancelled"
      ).length
    );

    // Delivery Revenue
    const deliveryTotal =
      orders
        .filter(
          (order) =>
            order.orderType ===
            "delivery"
        )
        .reduce(
          (
            sum,
            order
          ) =>
            sum +
            Number(
              order.total || 0
            ),
          0
        );

    // Walk-In Revenue
    const walkInTotal =
      orders
        .filter(
          (order) =>
            order.orderType ===
            "walkin"
        )
        .reduce(
          (
            sum,
            order
          ) =>
            sum +
            Number(
              order.total || 0
            ),
          0
        );

    setDeliveryRevenue(
      deliveryTotal
    );

    setWalkInRevenue(
      walkInTotal
    );

    // Cash Revenue
    const cashTotal =
      orders
        .filter(
          (order) =>
            order.paymentMethod ===
              "cash" ||
            order.paymentMethod ===
              "cod"
        )
        .reduce(
          (
            sum,
            order
          ) =>
            sum +
            Number(
              order.total || 0
            ),
          0
        );

    // Online Revenue
    const onlineTotal =
      orders
        .filter(
          (order) =>
            order.paymentMethod ===
              "upi" ||
            order.paymentMethod ===
              "card"
        )
        .reduce(
          (
            sum,
            order
          ) =>
            sum +
            Number(
              order.total || 0
            ),
          0
        );

    setCashRevenue(
      cashTotal
    );

    setOnlineRevenue(
      onlineTotal
    );

    // Total Revenue
    const revenue =
      orders.reduce(
        (
          sum,
          order
        ) =>
          sum +
          Number(
            order.total || 0
          ),
        0
      );

    setTotalRevenue(
      revenue
    );

    // Top Selling Item
    const itemSales = {};

    orders.forEach(
      (order) => {
        order.items?.forEach(
          (item) => {
            itemSales[
              item.name
            ] =
              (
                itemSales[
                  item.name
                ] || 0
              ) +
              item.quantity;
          }
        );
      }
    );

    const top =
      Object.entries(
        itemSales
      ).sort(
        (a, b) =>
          b[1] - a[1]
      )[0];

    setTopItem(
      top?.[0] ||
        "No Sales"
    );

    // Today's Revenue
    const today =
      new Date().toDateString();

    const todayTotal =
      orders
        .filter(
          (
            order
          ) => {
            if (
              !order
                .createdAt
                ?.seconds
            ) {
              return false;
            }

            return (
              new Date(
                order.createdAt.seconds *
                  1000
              ).toDateString() ===
              today
            );
          }
        )
        .reduce(
          (
            sum,
            order
          ) =>
            sum +
            Number(
              order.total || 0
            ),
          0
        );

    setTodayRevenue(
      todayTotal
    );
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">
        Welcome,{" "}
        {user?.name ||
          "Super Admin"}
      </h1>

      <p className="text-zinc-400 mb-8">
        Restaurant Management Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {/* Total Orders */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-3">
            {orders.length}
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{totalRevenue}
          </p>
        </div>

        {/* Delivery Revenue */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Delivery Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{deliveryRevenue}
          </p>
        </div>

        {/* Walk-In Revenue */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Walk-In Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{walkInRevenue}
          </p>
        </div>

        {/* Cash Revenue */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Cash Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{cashRevenue}
          </p>
        </div>

        {/* Online Revenue */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Online Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{onlineRevenue}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-yellow-500 rounded-xl p-6 text-black">
          <h2>Pending</h2>
          <p className="text-4xl font-bold">
            {pendingOrders}
          </p>
        </div>

        {/* Preparing */}
        <div className="bg-blue-500 rounded-xl p-6">
          <h2>Preparing</h2>
          <p className="text-4xl font-bold">
            {preparingOrders}
          </p>
        </div>

        {/* Out For Delivery */}
        <div className="bg-orange-500 rounded-xl p-6">
          <h2>
            Out For Delivery
          </h2>
          <p className="text-4xl font-bold">
            {outForDeliveryOrders}
          </p>
        </div>

        {/* Delivered */}
        <div className="bg-green-500 rounded-xl p-6">
          <h2>Delivered</h2>
          <p className="text-4xl font-bold">
            {deliveredOrders}
          </p>
        </div>

        {/* Cancelled */}
        <div className="bg-red-500 rounded-xl p-6">
          <h2>Cancelled</h2>
          <p className="text-4xl font-bold">
            {cancelledOrders}
          </p>
        </div>

        {/* Total Users */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Total Users
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalUsers}
          </p>
        </div>

        {/* Menu Items */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Menu Items
          </h2>

          <p className="text-4xl font-bold mt-3">
            {menuCount}
          </p>
        </div>

        {/* Top Selling Item */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Top Selling Item
          </h2>

          <p className="text-xl font-bold mt-3">
            {topItem}
          </p>
        </div>

        {/* Today's Revenue */}
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Today's Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{todayRevenue}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/admin/menu"
          className="
            bg-orange-500
            hover:bg-orange-600
            px-6
            py-3
            rounded-lg
          "
        >
          View Menu
        </Link>

        <Link
          href="/admin/walkin-order"
          className="
            bg-pink-500
            hover:bg-pink-600
            px-6
            py-3
            rounded-lg
          "
        >
          Walk-In Order
        </Link>

        <Link
          href="/admin/top-selling"
          className="
            bg-red-500
            hover:bg-red-600
            px-6
            py-3
            rounded-lg
          "
        >
          Top Selling Items
        </Link>

        <Link
          href="/admin/orders"
          className="
            bg-blue-500
            hover:bg-blue-600
            px-6
            py-3
            rounded-lg
          "
        >
          View Orders
        </Link>

        <Link
          href="/admin/users"
          className="
            bg-green-500
            hover:bg-green-600
            px-6
            py-3
            rounded-lg
          "
        >
          View Users
        </Link>

        <Link
          href="/admin/sales"
          className="
            bg-purple-500
            hover:bg-purple-600
            px-6
            py-3
            rounded-lg
          "
        >
          Sales Analytics
        </Link>

        <Link
          href="/admin/expenses"
          className="
            bg-red-500
            hover:bg-red-600
            px-6
            py-3
            rounded-lg
          "
        >
          Manage Expenses
        </Link>

        <Link
          href="/admin/revenue"
          className="
            bg-yellow-500
            px-6
            py-3
            rounded-lg
          "
        >
          Revenue Report
        </Link>

        <Link
          href="/admin/menu-hero"
          className="
            bg-orange-500
            px-6
            py-3
            rounded-lg
          "
        >
          Menu Hero Settings
        </Link>

        <Link
          href="/admin/coupons"
          className="
            bg-purple-500
            px-6
            py-3
            rounded-lg
          "
        >
          Manage Coupons
        </Link>
      </div>
    </div>
  );
}