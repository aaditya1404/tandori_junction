"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  addCoupon,
  getCoupons,
  deleteCoupon,
} from "@/services/couponService";

export default function CouponsPage() {

  const [code,
    setCode] =
    useState("");

  const [discountType,
    setDiscountType] =
    useState("fixed");

  const [discountValue,
    setDiscountValue] =
    useState("");

  const [minOrderAmount,
    setMinOrderAmount] =
    useState("");

  const [coupons,
    setCoupons] =
    useState([]);

  useEffect(() => {

    const loadCoupons =
      async () => {

        const result =
          await getCoupons();

        if (
          result.success
        ) {

          setCoupons(
            result.coupons
          );

        }

      };
    loadCoupons();

  }, []);


  const handleSave =
    async () => {

      const result =
        await addCoupon({

          code:
            code.toUpperCase(),

          discountType,

          discountValue:
            Number(
              discountValue
            ),

          minOrderAmount:
            Number(
              minOrderAmount
            ),

          isActive: true,

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
        "Coupon Added"
      );

      setCode("");
      setDiscountValue("");
      setMinOrderAmount("");

      loadCoupons();

    };

  const handleDelete =
    async (id) => {

      await deleteCoupon(
        id
      );

      loadCoupons();

    };

  // return (

    // <div className="min-h-screen bg-zinc-900 text-white p-8">

    //   <h1 className="text-4xl font-bold mb-8">
    //     Coupon Management
    //   </h1>

    //   <div className="max-w-xl space-y-4">

    //     <input
    //       placeholder="Coupon Code"
    //       value={code}
    //       onChange={(e) =>
    //         setCode(
    //           e.target.value
    //         )
    //       }
    //       className="w-full p-3 rounded bg-zinc-800"
    //     />

    //     <select
    //       value={discountType}
    //       onChange={(e) =>
    //         setDiscountType(
    //           e.target.value
    //         )
    //       }
    //       className="w-full p-3 rounded bg-zinc-800"
    //     >

    //       <option value="fixed">
    //         Fixed Amount
    //       </option>

    //       <option value="percentage">
    //         Percentage
    //       </option>

    //     </select>

    //     <input
    //       placeholder="Discount Value"
    //       type="number"
    //       value={discountValue}
    //       onChange={(e) =>
    //         setDiscountValue(
    //           e.target.value
    //         )
    //       }
    //       className="w-full p-3 rounded bg-zinc-800"
    //     />

    //     <input
    //       placeholder="Minimum Order Amount"
    //       type="number"
    //       value={minOrderAmount}
    //       onChange={(e) =>
    //         setMinOrderAmount(
    //           e.target.value
    //         )
    //       }
    //       className="w-full p-3 rounded bg-zinc-800"
    //     />

    //     <button
    //       onClick={
    //         handleSave
    //       }
    //       className="
    //       bg-green-500
    //       px-6
    //       py-3
    //       rounded-lg
    //       "
    //     >
    //       Add Coupon
    //     </button>

    //   </div>

    //   <div className="mt-12">

    //     <h2 className="text-2xl font-bold mb-4">
    //       Existing Coupons
    //     </h2>

    //     <table className="w-full bg-zinc-800 rounded-lg">

    //       <thead>

    //         <tr>

    //           <th className="p-4">
    //             Code
    //           </th>

    //           <th className="p-4">
    //             Type
    //           </th>

    //           <th className="p-4">
    //             Discount
    //           </th>

    //           <th className="p-4">
    //             Min Order
    //           </th>

    //           <th className="p-4">
    //             Action
    //           </th>

    //         </tr>

    //       </thead>

    //       <tbody>

    //         {coupons.map(
    //           (coupon) => (

    //             <tr
    //               key={
    //                 coupon.id
    //               }
    //             >

    //               <td className="p-4">
    //                 {coupon.code}
    //               </td>

    //               <td className="p-4">
    //                 {coupon.discountType}
    //               </td>

    //               <td className="p-4">
    //                 {coupon.discountValue}
    //               </td>

    //               <td className="p-4">
    //                 ₹
    //                 {
    //                   coupon.minOrderAmount
    //                 }
    //               </td>

    //               <td className="p-4">

    //                 <button
    //                   onClick={() =>
    //                     handleDelete(
    //                       coupon.id
    //                     )
    //                   }
    //                   className="
    //                   bg-red-500
    //                   px-3
    //                   py-2
    //                   rounded
    //                   "
    //                 >
    //                   Delete
    //                 </button>

    //               </td>

    //             </tr>

    //           )
    //         )}

    //       </tbody>

    //     </table>

    //   </div>

    // </div>

    return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
          Coupon Management
        </h1>

        {/* Add Coupon */}
        <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-5">
            Add New Coupon
          </h2>

          <div className="space-y-4">
            <input
              placeholder="Coupon Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 outline-none focus:border-orange-500"
            />

            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 outline-none focus:border-orange-500"
            >
              <option value="fixed">
                Fixed Amount
              </option>

              <option value="percentage">
                Percentage
              </option>
            </select>

            <input
              type="number"
              placeholder="Discount Value"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 outline-none focus:border-orange-500"
            />

            <input
              type="number"
              placeholder="Minimum Order Amount"
              value={minOrderAmount}
              onChange={(e) => setMinOrderAmount(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 outline-none focus:border-orange-500"
            />

            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 transition px-8 py-3 rounded-lg font-semibold"
            >
              Add Coupon
            </button>
          </div>
        </div>

        {/* Existing Coupons */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-5">
            Existing Coupons
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-zinc-700">
            <table className="w-full">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="p-4 text-left">
                    Code
                  </th>

                  <th className="p-4 text-left">
                    Type
                  </th>

                  <th className="p-4 text-left">
                    Discount
                  </th>

                  <th className="p-4 text-left">
                    Min Order
                  </th>

                  <th className="p-4 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {coupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className="border-t border-zinc-700 hover:bg-zinc-800/70 transition"
                  >
                    <td className="p-4 font-semibold">
                      {coupon.code}
                    </td>

                    <td className="p-4 capitalize">
                      {coupon.discountType}
                    </td>

                    <td className="p-4">
                      {coupon.discountType === "fixed"
                        ? `₹${coupon.discountValue}`
                        : `${coupon.discountValue}%`}
                    </td>

                    <td className="p-4">
                      ₹{coupon.minOrderAmount}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          handleDelete(coupon.id)
                        }
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-zinc-800 rounded-2xl border border-zinc-700 p-5"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-orange-400">
                    {coupon.code}
                  </h3>

                  <span className="text-sm bg-zinc-700 px-3 py-1 rounded-full capitalize">
                    {coupon.discountType}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-zinc-300">
                  <div className="flex justify-between">
                    <span>Discount</span>

                    <span className="font-semibold text-white">
                      {coupon.discountType === "fixed"
                        ? `₹${coupon.discountValue}`
                        : `${coupon.discountValue}%`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Minimum Order</span>

                    <span className="font-semibold text-white">
                      ₹{coupon.minOrderAmount}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleDelete(coupon.id)
                  }
                  className="mt-5 w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-semibold transition"
                >
                  Delete Coupon
                </button>
              </div>
            ))}
          </div>

          {coupons.length === 0 && (
            <div className="text-center text-zinc-400 py-12">
              No coupons available.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // );

}