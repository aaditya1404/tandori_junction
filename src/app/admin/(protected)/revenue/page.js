"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllOrders,
} from "@/services/orderService";

export default function RevenuePage() {
  const [revenueData, setRevenueData] =
    useState([]);

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [summary, setSummary] =
    useState({
      total: 0,
      delivery: 0,
      walkin: 0,
      cash: 0,
      online: 0,
    });

  useEffect(() => {
    const loadRevenue = async () => {
      const result =
        await getAllOrders();

      if (!result.success) return;

      const revenueByDate = {};

      result.orders.forEach((order) => {
        // 1) Skip orders without createdAt
        if (!order.createdAt?.seconds) {
          return;
        }

        // 2) Skip cancelled orders
        if (order.status === "cancelled") {
          return;
        }

        const orderDate = new Date(
          order.createdAt.seconds * 1000
        );

        // 3) From date filter
        if (
          fromDate &&
          orderDate < new Date(fromDate)
        ) {
          return;
        }

        // 4) To date filter
        if (
          toDate &&
          orderDate >
          new Date(toDate + "T23:59:59")
        ) {
          return;
        }

        const date =
          orderDate.toLocaleDateString(
            "en-IN"
          );

        if (!revenueByDate[date]) {
          revenueByDate[date] = {
            delivery: 0,
            walkin: 0,
            cash: 0,
            online: 0,
            total: 0,
          };
        }

        const amount = Number(
          order.total || 0
        );

        // Delivery revenue
        if (
          order.orderType === "delivery"
        ) {
          revenueByDate[date].delivery +=
            amount;
        }

        // Walk-in revenue
        if (
          order.orderType === "walkin"
        ) {
          revenueByDate[date].walkin +=
            amount;
        }

        // Cash revenue
        if (
          order.paymentMethod === "cash" ||
          order.paymentMethod === "cod"
        ) {
          revenueByDate[date].cash +=
            amount;
        }

        // Online revenue
        if (
          order.paymentMethod === "upi" ||
          order.paymentMethod === "card"
        ) {
          revenueByDate[date].online +=
            amount;
        }

        // Total revenue
        revenueByDate[date].total +=
          amount;
      });

      const summaryData = {
        total: 0,
        delivery: 0,
        walkin: 0,
        cash: 0,
        online: 0,
      };

      Object.values(revenueByDate).forEach(
        (day) => {
          summaryData.total += day.total;
          summaryData.delivery +=
            day.delivery;
          summaryData.walkin +=
            day.walkin;
          summaryData.cash += day.cash;
          summaryData.online +=
            day.online;
        }
      );

      setSummary(summaryData);

      const finalRows = Object.entries(
        revenueByDate
      )
        .map(([date, data]) => ({
          date,
          ...data,
        }))
        .sort(
          (a, b) =>
            new Date(
              b.date.split("/").reverse().join("-")
            ) -
            new Date(
              a.date.split("/").reverse().join("-")
            )
        );

      setRevenueData(finalRows);
    };
    loadRevenue();
  }, [fromDate, toDate]);


  // return (
  //   <div className="min-h-screen bg-zinc-900 text-white p-8">
  //     <h1 className="text-4xl font-bold mb-8">
  //       Revenue Report
  //     </h1>

  //     {/* Date Filters */}
  //     <div className="flex flex-wrap gap-4 mb-6">
  //       <input
  //         type="date"
  //         value={fromDate}
  //         onChange={(e) =>
  //           setFromDate(e.target.value)
  //         }
  //         className="
  //           bg-zinc-800
  //           p-3
  //           rounded-lg
  //         "
  //       />

  //       <input
  //         type="date"
  //         value={toDate}
  //         onChange={(e) =>
  //           setToDate(e.target.value)
  //         }
  //         className="
  //           bg-zinc-800
  //           p-3
  //           rounded-lg
  //         "
  //       />
  //     </div>

  //     {/* Summary Cards */}
  //     <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
  //       <div className="bg-zinc-800 p-4 rounded-xl">
  //         <p className="text-zinc-400">
  //           Total Revenue
  //         </p>
  //         <p className="text-2xl font-bold">
  //           ₹{summary.total}
  //         </p>
  //       </div>

  //       <div className="bg-zinc-800 p-4 rounded-xl">
  //         <p className="text-zinc-400">
  //           Delivery
  //         </p>
  //         <p className="text-2xl font-bold">
  //           ₹{summary.delivery}
  //         </p>
  //       </div>

  //       <div className="bg-zinc-800 p-4 rounded-xl">
  //         <p className="text-zinc-400">
  //           Walk-In
  //         </p>
  //         <p className="text-2xl font-bold">
  //           ₹{summary.walkin}
  //         </p>
  //       </div>

  //       <div className="bg-zinc-800 p-4 rounded-xl">
  //         <p className="text-zinc-400">
  //           Cash
  //         </p>
  //         <p className="text-2xl font-bold">
  //           ₹{summary.cash}
  //         </p>
  //       </div>

  //       <div className="bg-zinc-800 p-4 rounded-xl">
  //         <p className="text-zinc-400">
  //           Online
  //         </p>
  //         <p className="text-2xl font-bold">
  //           ₹{summary.online}
  //         </p>
  //       </div>
  //     </div>

  //     {/* Revenue Table */}
  //     <div className="bg-zinc-800 rounded-xl overflow-x-auto">
  //       <table className="w-full min-w-[900px]">
  //         <thead>
  //           <tr className="bg-zinc-700">
  //             <th className="p-4 text-left">
  //               Date
  //             </th>
  //             <th className="p-4 text-left">
  //               Delivery
  //             </th>
  //             <th className="p-4 text-left">
  //               Walk-In
  //             </th>
  //             <th className="p-4 text-left">
  //               Cash
  //             </th>
  //             <th className="p-4 text-left">
  //               Online
  //             </th>
  //             <th className="p-4 text-left">
  //               Total
  //             </th>
  //           </tr>
  //         </thead>

  //         <tbody>
  //           {revenueData.length === 0 ? (
  //             <tr>
  //               <td
  //                 colSpan={6}
  //                 className="p-6 text-center text-zinc-400"
  //               >
  //                 No revenue data found
  //               </td>
  //             </tr>
  //           ) : (
  //             revenueData.map((row) => (
  //               <tr
  //                 key={row.date}
  //                 className="
  //                   border-t
  //                   border-zinc-700
  //                 "
  //               >
  //                 <td className="p-4">
  //                   {row.date}
  //                 </td>

  //                 <td className="p-4">
  //                   ₹{row.delivery}
  //                 </td>

  //                 <td className="p-4">
  //                   ₹{row.walkin}
  //                 </td>

  //                 <td className="p-4">
  //                   ₹{row.cash}
  //                 </td>

  //                 <td className="p-4">
  //                   ₹{row.online}
  //                 </td>

  //                 <td className="p-4 font-bold">
  //                   ₹{row.total}
  //                 </td>
  //               </tr>
  //             ))
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
          Revenue Report
        </h1>

        {/* Date Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full sm:w-auto bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full sm:w-auto bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
          />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm">
              Total Revenue
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-2">
              ₹{summary.total}
            </p>
          </div>

          <div className="bg-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm">
              Delivery
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-2">
              ₹{summary.delivery}
            </p>
          </div>

          <div className="bg-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm">
              Walk-In
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-2">
              ₹{summary.walkin}
            </p>
          </div>

          <div className="bg-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm">
              Cash
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-2">
              ₹{summary.cash}
            </p>
          </div>

          <div className="bg-zinc-800 rounded-xl p-5 col-span-2 lg:col-span-1">
            <p className="text-zinc-400 text-sm">
              Online
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-2">
              ₹{summary.online}
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-zinc-800 rounded-xl overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-700">
                <th className="p-4 text-left">
                  Date
                </th>
                <th className="p-4 text-left">
                  Delivery
                </th>
                <th className="p-4 text-left">
                  Walk-In
                </th>
                <th className="p-4 text-left">
                  Cash
                </th>
                <th className="p-4 text-left">
                  Online
                </th>
                <th className="p-4 text-left">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {revenueData.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-zinc-400"
                  >
                    No revenue data found
                  </td>
                </tr>
              ) : (
                revenueData.map((row) => (
                  <tr
                    key={row.date}
                    className="border-t border-zinc-700 hover:bg-zinc-700/40 transition"
                  >
                    <td className="p-4">
                      {row.date}
                    </td>

                    <td className="p-4">
                      ₹{row.delivery}
                    </td>

                    <td className="p-4">
                      ₹{row.walkin}
                    </td>

                    <td className="p-4">
                      ₹{row.cash}
                    </td>

                    <td className="p-4">
                      ₹{row.online}
                    </td>

                    <td className="p-4 font-bold text-orange-400">
                      ₹{row.total}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {revenueData.length === 0 ? (
            <div className="bg-zinc-800 rounded-xl p-6 text-center text-zinc-400">
              No revenue data found
            </div>
          ) : (
            revenueData.map((row) => (
              <div
                key={row.date}
                className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">
                    {row.date}
                  </h3>

                  <span className="text-orange-400 font-bold">
                    ₹{row.total}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">
                      Delivery
                    </span>

                    <span>
                      ₹{row.delivery}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400">
                      Walk-In
                    </span>

                    <span>
                      ₹{row.walkin}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400">
                      Cash
                    </span>

                    <span>
                      ₹{row.cash}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400">
                      Online
                    </span>

                    <span>
                      ₹{row.online}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}