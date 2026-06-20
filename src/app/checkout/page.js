"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services/orderService";
import { getCurrentUser } from "@/services/authService";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = getCurrentUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const result = await createOrder({
      userId: user.uid,
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      paymentMethod: form.payment,
      items: cart,
      total,
    });

    if (result.success) {
      clearCart();

      router.push(
        `/order-success?orderId=${result.orderId}`
      );
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">
              Delivery Details
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full p-4 mb-4 rounded-xl bg-zinc-800"
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full p-4 mb-4 rounded-xl bg-zinc-800"
              required
            />

            <textarea
              placeholder="Delivery Address"
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              className="w-full p-4 mb-4 rounded-xl bg-zinc-800"
              rows={4}
              required
            />

            <h3 className="font-semibold mb-3">
              Payment Method
            </h3>

            <div className="space-y-2 mb-6">
              <label className="block">
                <input
                  type="radio"
                  value="cod"
                  checked={
                    form.payment === "cod"
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      payment:
                        e.target.value,
                    })
                  }
                />
                <span className="ml-2">
                  Cash on Delivery
                </span>
              </label>

              <label className="block">
                <input
                  type="radio"
                  value="upi"
                  checked={
                    form.payment === "upi"
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      payment:
                        e.target.value,
                    })
                  }
                />
                <span className="ml-2">
                  UPI Payment
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 py-4 rounded-xl font-bold"
            >
              Place Order
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₹
                    {item.price *
                      item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-700 mt-6 pt-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}