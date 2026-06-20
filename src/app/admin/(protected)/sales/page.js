"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllOrders,
} from "@/services/orderService";

export default function SalesPage() {

  const [sales,
    setSales] =
    useState([]);

  useEffect(() => {

    loadSales();

  }, []);

  const loadSales =
    async () => {

    const result =
      await getAllOrders();

    if (
      !result.success
    ) return;

    const soldItems = {};

    result.orders.forEach(
      (order) => {

        order.items?.forEach(
          (item) => {

            if (
              !soldItems[
                item.name
              ]
            ) {

              soldItems[
                item.name
              ] = 0;

            }

            soldItems[
              item.name
            ] +=
              item.quantity;

          }
        );

      }
    );

    const finalData =
      Object.entries(
        soldItems
      ).map(
        ([name,
          quantity]) => ({
          name,
          quantity,
        })
      );

    setSales(
      finalData
    );

  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Items Sold
      </h1>

      <table className="w-full border border-zinc-700">

        <thead>

          <tr>

            <th className="p-3">
              Item
            </th>

            <th className="p-3">
              Quantity Sold
            </th>

          </tr>

        </thead>

        <tbody>

          {sales.map(
            (item) => (

              <tr
                key={
                  item.name
                }
                className="border-t border-zinc-700"
              >

                <td className="p-3">
                  {item.name}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );

}