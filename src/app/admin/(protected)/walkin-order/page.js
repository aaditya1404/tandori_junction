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
    loadMenu();

  }, []);


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

    const loadOrderNumber =
      async () => {

        const number =
          await getNextOrderNumber();

        setOrderNumber(
          number
        );

      };
    loadOrderNumber();

  }, []);

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

  //   return (


  //     <div className="min-h-screen bg-zinc-900 text-white p-8">

  //       <h1 className="text-4xl font-bold mb-8">
  //         Walk-In Order
  //       </h1>

  //       <div className="max-w-4xl space-y-6">

  //         <input
  //   type="text"
  //   value={orderNumber}
  //   readOnly
  //   className="
  //   w-full
  //   p-3
  //   rounded-lg
  //   bg-zinc-700
  //   "
  // />

  //         <div className="space-y-4">

  //           {items.map(
  //             (
  //               item,
  //               index
  //             ) => (

  //               <div
  //                 key={index}
  //                 className="
  //                 flex
  //                 gap-4
  //                 items-center
  //                 "
  //               >
  // <div className="relative flex-1">

  //   <input
  //     type="text"
  //     placeholder="Search Item"
  //     value={item.name}
  //     onChange={(e) => {

  //       const updated =
  //         [...items];

  //       updated[index].name =
  //         e.target.value;

  //       setItems(
  //         updated
  //       );

  //     }}
  //     className="
  //     w-full
  //     p-3
  //     rounded-lg
  //     bg-zinc-800
  //     "
  //   />

  //   {item.name && (

  //     <div
  //       className="
  //       absolute
  //       top-full
  //       left-0
  //       right-0
  //       bg-zinc-800
  //       border
  //       border-zinc-700
  //       max-h-60
  //       overflow-y-auto
  //       z-50
  //       "
  //     >

  //       {menuItems
  //         .filter(
  //           (menuItem) =>
  //             menuItem.name
  //               .toLowerCase()
  //               .includes(
  //                 item.name.toLowerCase()
  //               )
  //         )
  //         .map(
  //           (menuItem) => (

  //             <div
  //               key={menuItem.id}
  //               onClick={() => {

  //                 const updated =
  //                   [...items];

  //                 updated[index] = {

  //                   ...updated[index],

  //                   name:
  //                     menuItem.name,

  //                   price:
  //                     menuItem.price,

  //                 };

  //                 setItems(
  //                   updated
  //                 );

  //               }}
  //               className="
  //               p-3
  //               cursor-pointer
  //               hover:bg-zinc-700
  //               "
  //             >

  //               {menuItem.name}

  //             </div>

  //           )
  //         )}

  //     </div>

  //   )}

  // </div>

  //                <input
  //   type="number"
  //   value={item.price}
  //   readOnly
  //   className="
  //   w-32
  //   p-3
  //   rounded-lg
  //   bg-zinc-700
  //   "
  // />

  //                 <input
  //                   type="number"
  //                   placeholder="Qty"
  //                   value={item.quantity}
  //                   onChange={(e) =>
  //   updateItem(
  //     index,
  //     "quantity",
  //     Math.max(
  //       1,
  //       Number(
  //         e.target.value
  //       )
  //     )
  //   )
  // }
  //                   className="
  //                   w-24
  //                   p-3
  //                   rounded-lg
  //                   bg-zinc-800
  //                   "
  //                 />

  //                 <button
  //                   onClick={() =>
  //                     removeItem(
  //                       index
  //                     )
  //                   }
  //                   className="
  //                   bg-red-500
  //                   px-4
  //                   py-3
  //                   rounded-lg
  //                   "
  //                 >
  //                   X
  //                 </button>

  //               </div>

  //             )
  //           )}

  //         </div>

  //         <button
  //           onClick={addItem}
  //           className="
  //           bg-blue-500
  //           hover:bg-blue-600
  //           px-6
  //           py-3
  //           rounded-lg
  //           "
  //         >
  //           + Add Item
  //         </button>

  //         <div
  //           className="
  //           text-2xl
  //           font-bold
  //           "
  //         >
  //           Total : ₹{total}
  //         </div>

  //         <select
  //           value={paymentMethod}
  //           onChange={(e) =>
  //             setPaymentMethod(
  //               e.target.value
  //             )
  //           }
  //           className="
  //           w-full
  //           p-3
  //           rounded-lg
  //           bg-zinc-800
  //           "
  //         >

  //           <option value="cash">
  //             Cash
  //           </option>

  //           <option value="upi">
  //             UPI
  //           </option>

  //           <option value="card">
  //             Card
  //           </option>

  //         </select>

  //         <button
  //           onClick={
  //             handleSaveOrder
  //           }
  //           className="
  //           bg-orange-500
  //           hover:bg-orange-600
  //           px-6
  //           py-3
  //           rounded-lg
  //           "
  //         >
  //           Save Order
  //         </button>

  //       </div>

  //     </div>

  //   );

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          Walk-In Order
        </h1>

        <div className="space-y-6">
          <input
            type="text"
            value={orderNumber}
            readOnly
            className="w-full p-3 rounded-lg bg-zinc-700"
          />

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 space-y-4"
              >
                {/* Search */}
                <div className="relative">
                  <label className="text-sm text-zinc-400 mb-2 block">
                    Item
                  </label>

                  <input
                    type="text"
                    placeholder="Search Item..."
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[index].name = e.target.value;
                      setItems(updated);
                    }}
                    className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700"
                  />

                  {item.name && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl max-h-56 overflow-y-auto z-50">
                      {menuItems
                        .filter((menuItem) =>
                          menuItem.name
                            .toLowerCase()
                            .includes(item.name.toLowerCase())
                        )
                        .map((menuItem) => (
                          <div
                            key={menuItem.id}
                            onClick={() => {
                              const updated = [...items];

                              updated[index] = {
                                ...updated[index],
                                name: menuItem.name,
                                price: menuItem.price,
                              };

                              setItems(updated);
                            }}
                            className="p-3 hover:bg-zinc-700 cursor-pointer"
                          >
                            <div className="flex justify-between">
                              <span>{menuItem.name}</span>
                              <span>₹{menuItem.price}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Price + Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">
                      Price
                    </label>

                    <input
                      type="number"
                      value={item.price}
                      readOnly
                      className="w-full p-3 rounded-lg bg-zinc-700 text-center"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">
                      Quantity
                    </label>

                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-center"
                    />
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(index)}
                  className="w-full bg-red-500 hover:bg-red-600 transition rounded-lg py-3 font-semibold"
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            + Add Item
          </button>

          <div className="text-right text-xl sm:text-2xl font-bold">
            Total : ₹{total}
          </div>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>

          <button
            onClick={handleSaveOrder}
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold text-lg transition"
          >
            Save Order
          </button>
        </div>
      </div>
    </div>
  );

}