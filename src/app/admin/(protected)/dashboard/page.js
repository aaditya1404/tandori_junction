"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { getAllOrders } from "@/services/orderService";

import { getAllUsers } from "@/services/userService";

import { getAllMenuItems } from "@/services/menuService";
import {
  ShoppingCart,
  IndianRupee,
  Users,
  Wallet,
} from "lucide-react";

import DashboardCard from "@/components/admin/DashboardCard";
import RevenueChart from "@/components/admin/RevenueChart";
import TopSellingItems from "@/components/admin/TopSellingItems";
import OrdersOverview from "@/components/admin/OrdersOverview";
import RecentOrders from "@/components/admin/RecentOrders";
import SalesSummary from "@/components/admin/SalesSummary";

export default function AdminDashboard() {

  const { user } =
    useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);

  const [totalRevenue, setTotalRevenue] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);
  const [deliveryRevenue, setDeliveryRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  const [preparingOrders, setPreparingOrders] = useState(0);

  const [outForDeliveryOrders, setOutForDeliveryOrders] = useState(0);

  const [deliveredOrders, setDeliveredOrders] = useState(0);

  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [walkInRevenue, setWalkInRevenue] = useState(0);
  const [cashRevenue, setCashRevenue] = useState(0);

  const [onlineRevenue, setOnlineRevenue] = useState(0);
  const [menuCount, setMenuCount] = useState(0);

  const [topItem, setTopItem] = useState("No Sales");

  const [todayRevenue, setTodayRevenue] = useState(0);
  useEffect(() => {
    const loadDashboard = async () => {
      const orderResult = await getAllOrders();
      const userResult = await getAllUsers();
      const menuResult = await getAllMenuItems();

      if (orderResult.success) {
        const orders = orderResult.orders;
        setOrders(orders);
        setPendingOrders(orders.filter((o) => o.status === "pending").length);

        setPreparingOrders(orders.filter((o) => o.status === "preparing").length);

        setOutForDeliveryOrders(
          orders.filter((o) => o.status === "out_for_delivery").length);

        setDeliveredOrders(
          orders.filter((o) => o.status === "delivered").length);

        setCancelledOrders(orders.filter((o) => o.status === "cancelled").length);

        const deliveryTotal = orders.filter((order) => order.orderType === "delivery")
          .reduce((sum, order) => sum + Number(order.total || 0), 0);

        const walkInTotal = orders.filter((order) => order.orderType === "walkin")
          .reduce((sum, order) => sum + Number(order.total || 0), 0);

        setDeliveryRevenue(deliveryTotal);
        setWalkInRevenue(walkInTotal);

        const cashTotal = orders.filter((order) => order.paymentMethod === "cash")
          .reduce((sum, order) => sum + Number(order.total || 0), 0);

        const onlineTotal = orders.filter((order) => order.paymentMethod === "upi" || order.paymentMethod === "card")
          .reduce((sum, order) => sum + Number(order.total || 0), 0);

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

        const itemSales =
          {};

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
          new Date()
            .toDateString();

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

      }

      // Users

      if (
        userResult.success
      ) {

        setTotalUsers(
          userResult.users.length
        );

      }

      // Menu Items

      if (
        menuResult.success
      ) {

        setMenuCount(
          menuResult.data.length
        );

      }

    };
    loadDashboard();

  }, []);

  return (
    // <div className="min-h-screen bg-zinc-900 text-white p-8">

    //   <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    //     <DashboardCard
    //       title="Total Orders"
    //       value={orders.length}
    //       icon={ShoppingCart}
    //       growth="+18.5%"
    //     />

    //     <DashboardCard
    //       title="Total Revenue"
    //       value={`₹${totalRevenue}`}
    //       icon={IndianRupee}
    //       growth="+22.7%"
    //     />

    //     <DashboardCard
    //       title="Total Users"
    //       value={totalUsers}
    //       icon={Users}
    //       growth="+12.4%"
    //     />

    //     <DashboardCard
    //       title="Today's Revenue"
    //       value={`₹${todayRevenue}`}
    //       icon={Wallet}
    //       growth="+8.3%"
    //     />
    //   </div>
    //     <div className="flex gap-2 w-full mt-8">
    //       <RevenueChart orders={orders} />
    //       <OrdersOverview orders={orders} />
    //       <TopSellingItems orders={orders} />
    //     </div>
    //     <div className="flex gap-2 mt-8">
    //       <RecentOrders orders={orders} />
    //       <SalesSummary orders={orders} />
    //     </div>

    // </div>
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-6 lg:p-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Orders"
          value={orders.length}
          icon={ShoppingCart}
          growth="+18.5%"
        />

        <DashboardCard
          title="Total Revenue"
          value={`₹${totalRevenue}`}
          icon={IndianRupee}
          growth="+22.7%"
        />

        <DashboardCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          growth="+12.4%"
        />

        <DashboardCard
          title="Today's Revenue"
          value={`₹${todayRevenue}`}
          icon={Wallet}
          growth="+8.3%"
        />

      </div>

      {/* Revenue + Orders + Top Selling */}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">

        <div className="xl:col-span-5">
          <RevenueChart orders={orders} />
        </div>

        <div className="xl:col-span-3">
          <OrdersOverview orders={orders} />
        </div>

        <div className="xl:col-span-4">
          <TopSellingItems orders={orders} />
        </div>

      </div>

      {/* Recent Orders + Sales Summary */}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">

        <div className="xl:col-span-8">
          <RecentOrders orders={orders} />
        </div>

        <div className="xl:col-span-4">
          <SalesSummary orders={orders} />
        </div>

      </div>

    </div>
  );

}