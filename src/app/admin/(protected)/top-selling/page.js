"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllOrders,
} from "@/services/orderService";

export default function TopSellingPage() {

  const [items,
    setItems] =
    useState([]);

  useEffect(() => {

    loadItems();

  }, []);

  const loadItems =
    async () => {

      const result =
        await getAllOrders();

      if (
        !result.success
      ) {
        return;
      }

      const sales =
        {};

      result.orders.forEach(
        (order) => {

          order.items?.forEach(
            (item) => {

              if (
                !sales[
                  item.name
                ]
              ) {

                sales[
                  item.name
                ] = {
                  quantity: 0,
                  revenue: 0,
                };

              }

              sales[
                item.name
              ].quantity +=
                Number(
                  item.quantity || 0
                );

              sales[
                item.name
              ].revenue +=
                Number(
                  item.price || 0
                ) *
                Number(
                  item.quantity || 0
                );

            }
          );

        }
      );

      const finalData =
        Object.entries(
          sales
        ).map(
          ([name, data]) => ({
            name,
            ...data,
          })
        );

      finalData.sort(
        (a, b) =>
          b.quantity -
          a.quantity
      );

      setItems(
        finalData
      );

    };

  return (

    <div className="min-h-screen bg-zinc-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Top Selling Items
      </h1>

      <div className="bg-zinc-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-zinc-700">

              <th className="p-4 text-left">
                Item
              </th>

              <th className="p-4 text-left">
                Quantity Sold
              </th>

              <th className="p-4 text-left">
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {items.length > 0 ? (

              items.map(
                (item) => (

                  <tr
                    key={item.name}
                    className="
                    border-t
                    border-zinc-700
                    "
                  >

                    <td className="p-4">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.quantity}
                    </td>

                    <td className="p-4">
                      ₹{item.revenue}
                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="
                  p-8
                  text-center
                  text-zinc-400
                  "
                >
                  No sales data found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}