"use client";

//import { useState } from "react";

import {
  createWalkInOrder,
} from "@/services/orderService";
import {
  useEffect,
  useState,
} from "react";
import {
  getNextOrderNumber,
} from "@/services/orderService";
import {
  getAllMenuItems,
} from "@/services/menuService";
export default function WalkInOrderPage() {

  const [orderNumber,
    setOrderNumber] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("cash");
const [menuItems,
  setMenuItems] =
  useState([]);

  const [items,
    setItems] =
    useState([
      {
        name: "",
        price: 0,
        quantity: 1,
      },
    ]);

  const total =
    items.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
    useEffect(() => {

  loadMenu();

}, []);

const loadMenu =
  async () => {

  const result =
    await getAllMenuItems();

  if (
    result.success
  ) {

    setMenuItems(
      result.data
    );

  }

};

  const addItem =
    () => {

      setItems([
        ...items,
        {
          name: "",
          price: 0,
          quantity: 1,
        },
      ]);

    };
    useEffect(() => {

  loadOrderNumber();

}, []);

const loadOrderNumber =
  async () => {

  const number =
    await getNextOrderNumber();

  setOrderNumber(
    number
  );

};
const [searchTerm,
  setSearchTerm] =
  useState("");
  const updateItem =
    (
      index,
      field,
      value
    ) => {

      const updated =
        [...items];

      updated[index][field] =
        value;

      setItems(
        updated
      );

    };

  const removeItem =
    (index) => {

      const updated =
        items.filter(
          (_, i) =>
            i !== index
        );

      setItems(
        updated
      );

    };

  const handleSaveOrder =
    async () => {

      if (
        !orderNumber
      ) {

        alert(
          "Please enter order number"
        );

        return;

      }

      if (
        items.length === 0
      ) {

        alert(
          "Please add items"
        );

        return;

      }

      const result =
        await createWalkInOrder({
          orderNumber,

          items,

          total,

          paymentMethod,
        });

      if (
        !result.success
      ) {

        alert(
          result.error
        );

        return;

      }

      alert(
        "Walk-In Order Saved"
      );

      setOrderNumber("");

      setItems([
        {
          name: "",
          price: 0,
          quantity: 1,
        },
      ]);

      setPaymentMethod(
        "cash"
      );

    };

  return (

    <div className="min-h-screen bg-zinc-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Walk-In Order
      </h1>

      <div className="max-w-4xl space-y-6">

        <input
  type="text"
  value={orderNumber}
  readOnly
  className="
  w-full
  p-3
  rounded-lg
  bg-zinc-700
  "
/>

        <div className="space-y-4">

          {items.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="
                flex
                gap-4
                items-center
                "
              >
<div className="relative flex-1">

  <input
    type="text"
    placeholder="Search Item"
    value={item.name}
    onChange={(e) => {

      const updated =
        [...items];

      updated[index].name =
        e.target.value;

      setItems(
        updated
      );

    }}
    className="
    w-full
    p-3
    rounded-lg
    bg-zinc-800
    "
  />

  {item.name && (

    <div
      className="
      absolute
      top-full
      left-0
      right-0
      bg-zinc-800
      border
      border-zinc-700
      max-h-60
      overflow-y-auto
      z-50
      "
    >

      {menuItems
        .filter(
          (menuItem) =>
            menuItem.name
              .toLowerCase()
              .includes(
                item.name.toLowerCase()
              )
        )
        .map(
          (menuItem) => (

            <div
              key={menuItem.id}
              onClick={() => {

                const updated =
                  [...items];

                updated[index] = {

                  ...updated[index],

                  name:
                    menuItem.name,

                  price:
                    menuItem.price,

                };

                setItems(
                  updated
                );

              }}
              className="
              p-3
              cursor-pointer
              hover:bg-zinc-700
              "
            >

              {menuItem.name}

            </div>

          )
        )}

    </div>

  )}

</div>

               <input
  type="number"
  value={item.price}
  readOnly
  className="
  w-32
  p-3
  rounded-lg
  bg-zinc-700
  "
/>

                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
  updateItem(
    index,
    "quantity",
    Math.max(
      1,
      Number(
        e.target.value
      )
    )
  )
}
                  className="
                  w-24
                  p-3
                  rounded-lg
                  bg-zinc-800
                  "
                />

                <button
                  onClick={() =>
                    removeItem(
                      index
                    )
                  }
                  className="
                  bg-red-500
                  px-4
                  py-3
                  rounded-lg
                  "
                >
                  X
                </button>

              </div>

            )
          )}

        </div>

        <button
          onClick={addItem}
          className="
          bg-blue-500
          hover:bg-blue-600
          px-6
          py-3
          rounded-lg
          "
        >
          + Add Item
        </button>

        <div
          className="
          text-2xl
          font-bold
          "
        >
          Total : ₹{total}
        </div>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
          className="
          w-full
          p-3
          rounded-lg
          bg-zinc-800
          "
        >

          <option value="cash">
            Cash
          </option>

          <option value="upi">
            UPI
          </option>

          <option value="card">
            Card
          </option>

        </select>

        <button
          onClick={
            handleSaveOrder
          }
          className="
          bg-orange-500
          hover:bg-orange-600
          px-6
          py-3
          rounded-lg
          "
        >
          Save Order
        </button>

      </div>

    </div>

  );

}