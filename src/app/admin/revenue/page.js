"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllOrders,
} from "@/services/orderService";

export default function RevenuePage() {

  const [revenueData,
    setRevenueData] =
    useState([]);

  const [fromDate,
    setFromDate] =
    useState("");

  const [toDate,
    setToDate] =
    useState("");
    const [summary,
  setSummary] =
  useState({
    total: 0,
    delivery: 0,
    walkin: 0,
    cash: 0,
    online: 0,
  });

  useEffect(() => {

    loadRevenue();

  }, [fromDate, toDate]);

  const loadRevenue =
    async () => {

      const result =
        await getAllOrders();

      if (!result.success)
        return;

      const revenueByDate =
        {};

      result.orders.forEach(
        (order) => {

          if (
            !order.createdAt?.seconds
          )
            return;

          const orderDate =
            new Date(
              order.createdAt.seconds *
              1000
            );

          // Date Filter

          if (
            fromDate &&
            orderDate <
            new Date(fromDate)
          ) {
            return;
          }

          if (
            toDate &&
            orderDate >
            new Date(
              toDate +
              "T23:59:59"
            )
          ) {
            return;
          }

          const date =
            orderDate.toLocaleDateString(
              "en-IN"
            );

          if (
            !revenueByDate[
              date
            ]
          ) {

            revenueByDate[
              date
            ] = {
              delivery: 0,
              walkin: 0,
              cash: 0,
              online: 0,
              total: 0,
            };

          }

          const amount =
            Number(
              order.total || 0
            );

          // Delivery Revenue

          if (
            order.orderType ===
            "delivery"
          ) {

            revenueByDate[
              date
            ].delivery +=
              amount;

          }

          // Walk-In Revenue

          if (
            order.orderType ===
            "walkin"
          ) {

            revenueByDate[
              date
            ].walkin +=
              amount;

          }

          // Cash Revenue

          if (
            order.paymentMethod ===
              "cash" ||
            order.paymentMethod ===
              "cod"
          ) {

            revenueByDate[
              date
            ].cash +=
              amount;

          }

          // Online Revenue

          if (
            order.paymentMethod ===
              "upi" ||
            order.paymentMethod ===
              "card"
          ) {

            revenueByDate[
              date
            ].online +=
              amount;

          }

          revenueByDate[
            date
          ].total += amount;

        }
      );
const summaryData = {
  total: 0,
  delivery: 0,
  walkin: 0,
  cash: 0,
  online: 0,
};

Object.values(
  revenueByDate
).forEach(
  (day) => {

    summaryData.total +=
      day.total;

    summaryData.delivery +=
      day.delivery;

    summaryData.walkin +=
      day.walkin;

    summaryData.cash +=
      day.cash;

    summaryData.online +=
      day.online;

  }
);

setSummary(
  summaryData
);
      setRevenueData(
        Object.entries(
          revenueByDate
        ).map(
          ([date, data]) => ({
            date,
            ...data,
          })
        )
      );

    };

  return (

    <div className="min-h-screen bg-zinc-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Revenue Report
      </h1>

      {/* Date Filters */}

      <div className="flex gap-4 mb-6">

        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(
              e.target.value
            )
          }
          className="
          bg-zinc-800
          p-3
          rounded-lg
          "
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(
              e.target.value
            )
          }
          className="
          bg-zinc-800
          p-3
          rounded-lg
          "
        />

      </div>
     <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400">
      Total Revenue
    </p>
    <p className="text-2xl font-bold">
      ₹{summary.total}
    </p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400">
      Delivery
    </p>
    <p className="text-2xl font-bold">
      ₹{summary.delivery}
    </p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400">
      Walk-In
    </p>
    <p className="text-2xl font-bold">
      ₹{summary.walkin}
    </p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400">
      Cash
    </p>
    <p className="text-2xl font-bold">
      ₹{summary.cash}
    </p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400">
      Online
    </p>
    <p className="text-2xl font-bold">
      ₹{summary.online}
    </p>
  </div>

</div>
      <div className="bg-zinc-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-zinc-700">

              <th className="p-4">
                Date
              </th>

              <th className="p-4">
                Delivery
              </th>

              <th className="p-4">
                Walk-In
              </th>

              <th className="p-4">
                Cash
              </th>

              <th className="p-4">
                Online
              </th>

              <th className="p-4">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {revenueData.map(
              (row) => (

                <tr
                  key={row.date}
                  className="
                  border-t
                  border-zinc-700
                  "
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

                  <td className="p-4 font-bold">
                    ₹{row.total}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}