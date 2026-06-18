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

    loadCoupons();

  }, []);

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

  return (

    <div className="min-h-screen bg-zinc-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Coupon Management
      </h1>

      <div className="max-w-xl space-y-4">

        <input
          placeholder="Coupon Code"
          value={code}
          onChange={(e) =>
            setCode(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-zinc-800"
        />

        <select
          value={discountType}
          onChange={(e) =>
            setDiscountType(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-zinc-800"
        >

          <option value="fixed">
            Fixed Amount
          </option>

          <option value="percentage">
            Percentage
          </option>

        </select>

        <input
          placeholder="Discount Value"
          type="number"
          value={discountValue}
          onChange={(e) =>
            setDiscountValue(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          placeholder="Minimum Order Amount"
          type="number"
          value={minOrderAmount}
          onChange={(e) =>
            setMinOrderAmount(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button
          onClick={
            handleSave
          }
          className="
          bg-green-500
          px-6
          py-3
          rounded-lg
          "
        >
          Add Coupon
        </button>

      </div>

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-4">
          Existing Coupons
        </h2>

        <table className="w-full bg-zinc-800 rounded-lg">

          <thead>

            <tr>

              <th className="p-4">
                Code
              </th>

              <th className="p-4">
                Type
              </th>

              <th className="p-4">
                Discount
              </th>

              <th className="p-4">
                Min Order
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {coupons.map(
              (coupon) => (

                <tr
                  key={
                    coupon.id
                  }
                >

                  <td className="p-4">
                    {coupon.code}
                  </td>

                  <td className="p-4">
                    {coupon.discountType}
                  </td>

                  <td className="p-4">
                    {coupon.discountValue}
                  </td>

                  <td className="p-4">
                    ₹
                    {
                      coupon.minOrderAmount
                    }
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          coupon.id
                        )
                      }
                      className="
                      bg-red-500
                      px-3
                      py-2
                      rounded
                      "
                    >
                      Delete
                    </button>

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