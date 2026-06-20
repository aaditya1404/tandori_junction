"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  observeAuthState,
} from "@/services/authService";
import {
  markReviewSubmitted,
} from "@/services/orderService";
import {
  subscribeToUserOrders,
} from "@/services/orderService";
import {
  addReview,
} from "@/services/reviewService";

import {
  updateOrderStatus,
} from "@/services/orderService";

export default function MyOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
    const [showReview,
  setShowReview] =
  useState(false);

const [selectedOrder,
  setSelectedOrder] =
  useState(null);

const [rating,
  setRating] =
  useState(5);

const [review,
  setReview] =
  useState("");

  const openReviewModal =
  (order) => {

    setSelectedOrder(
      order
    );

    setShowReview(
      true
    );

  };

const submitReview =
  async () => {

    if (
      !selectedOrder
    ) return;

    const result =
      await createReview({

        orderId:
          selectedOrder.id,

        userId:
          selectedOrder.userId,

        rating,

        review,

      });

    if (
      result.success
    ) {
      await markReviewSubmitted(
    selectedOrder.id
  );


      alert(
        "Review submitted"
      );

      setShowReview(
        false
      );

      setReview("");

      setRating(5);

    }

  };

  useEffect(() => {

    let unsubscribeOrders;

    const unsubscribeAuth =
      observeAuthState(
        (user) => {

          if (!user) {

            setLoading(false);
            return;

          }

          unsubscribeOrders =
            subscribeToUserOrders(
              user.uid,

              (orders) => {

                setOrders(
                  orders
                );

                setLoading(
                  false
                );

              }
            );

        }
      );

    return () => {

      unsubscribeAuth();

      if (
        unsubscribeOrders
      ) {

        unsubscribeOrders();

      }

    };

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Orders...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="border-b border-zinc-800 py-16">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            My Orders
          </h1>

          <p className="text-zinc-400 mt-3">
            View all your previous orders
          </p>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {orders.length === 0 ? (

          <div
            className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-2xl
            p-10
            text-center
            "
          >
            No Orders Yet
          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                p-6
                "
              >

                <div className="flex justify-between items-center flex-wrap gap-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      #{order.id}
                    </h2>

                    <p className="text-zinc-400 mt-1">

                      {order.createdAt?.seconds
                        ? new Date(
                            order.createdAt.seconds *
                            1000
                          ).toLocaleString()
                        : "N/A"}

                    </p>

                  </div>

                  <div>

                    <p className="text-orange-500 text-xl font-bold">
                      ₹{order.total}
                    </p>

                  </div>

                  <div>

                    <span
                      className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm

                      ${
                        order.status ===
                        "delivered"
                          ? "bg-green-500"
                          : order.status ===
                            "out_for_delivery"
                          ? "bg-purple-500"
                          : order.status ===
                            "preparing"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }
                    `}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                <div className="mt-6">

                  <h3 className="font-semibold mb-3">
                    Ordered Items
                  </h3>

                  <div className="space-y-2">

                    {order.items?.map(
                      (item) => (

                        <div
                          key={item.name}
                          className="
                          flex
                          justify-between
                          "
                        >

                          <span>
                            {item.name}
                            {" × "}
                            {item.quantity}
                          </span>

                          <span>
                            ₹
                            {item.price *
                              item.quantity}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

                <div className="mt-6 flex gap-4">

                  <Link
                    href={`/track-order/${order.id}`}
                    className="
                    bg-orange-500
                    px-5
                    py-2
                    rounded-xl
                    "
                  >
                    Track Order
                  </Link>

                  <button
                    className="
                    bg-zinc-800
                    px-5
                    py-2
                    rounded-xl
                    "
                  >
                    Reorder
                  </button>
                 {order.status ===
  "delivered" &&

 !order.reviewSubmitted && (  

  <button
    onClick={() =>
      openReviewModal(
        order
      )
    }
    className="
    bg-yellow-500
    px-5
    py-2
    rounded-xl
    text-black
    "
  >
    ⭐ Review
  </button>

)}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
{showReview && (

  <div
    className="
    fixed
    inset-0
    bg-black/70
    flex
    items-center
    justify-center
    z-50
    "
  >

    <div
      className="
      bg-zinc-900
      p-6
      rounded-2xl
      w-[500px]
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4
        "
      >
        Rate Your Order
      </h2>

      <select
        value={rating}
        onChange={(e) =>
          setRating(
            Number(
              e.target.value
            )
          )
        }
        className="
        w-full
        p-3
        rounded-xl
        bg-zinc-800
        mb-4
        "
      >

        <option value={5}>
          ⭐⭐⭐⭐⭐
        </option>

        <option value={4}>
          ⭐⭐⭐⭐
        </option>

        <option value={3}>
          ⭐⭐⭐
        </option>

        <option value={2}>
          ⭐⭐
        </option>

        <option value={1}>
          ⭐
        </option>

      </select>

      <textarea
        rows={4}
        value={review}
        onChange={(e) =>
          setReview(
            e.target.value
          )
        }
        placeholder="Share your experience..."
        className="
        w-full
        p-3
        rounded-xl
        bg-zinc-800
        "
      />

      <div
        className="
        flex
        gap-4
        mt-4
        "
      >

        <button
          onClick={
            submitReview
          }
          className="
          bg-green-500
          px-4
          py-2
          rounded-lg
          "
        >
          Submit
        </button>

        <button
          onClick={() =>
            setShowReview(
              false
            )
          }
          className="
          bg-red-500
          px-4
          py-2
          rounded-lg
          "
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
    </div>
  );
}