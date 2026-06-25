"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

import { createOrder } from "@/services/orderService";
import { getCurrentUser } from "@/services/authService";
import {
  getUserProfile,
  saveUserProfile,
} from "@/services/profileService";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    payment: "cod",
  });

  // Wait for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load saved profile after mount
  useEffect(() => {
    if (!mounted) return;
    loadProfile();
  }, [mounted]);

  const loadProfile = async () => {
    const user = getCurrentUser();

    if (!user) {
      setLoadingProfile(false);
      return;
    }

    const result = await getUserProfile(user.uid);

    if (result.success && result.profile) {
      setForm((prev) => ({
        ...prev,
        name: result.profile.name || "",
        phone: result.profile.phone || "",
        address: result.profile.address || "",
        latitude: result.profile.latitude || "",
        longitude: result.profile.longitude || "",
      }));
    }

    setLoadingProfile(false);
  };

  // SAME CALCULATION AS CART DRAWER
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const deliveryFee = cart.length > 0 ? 40 : 0;
  const taxes = cart.length > 0 ? 20 : 0;
  const total = subtotal + deliveryFee + taxes;

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } =
          position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          setForm((prev) => ({
            ...prev,
            address: data.display_name || "",
            latitude,
            longitude,
          }));
        } catch {
          alert("Unable to fetch address");
        }
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

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

    // save / update user profile
    const profileResult =
      await saveUserProfile(user.uid, {
        name: form.name,
        phone: form.phone,
        address: form.address,
        latitude: form.latitude || "",
        longitude: form.longitude || "",
      });

    if (!profileResult.success) {
      alert(
        profileResult.error ||
          "Unable to save profile"
      );
      return;
    }

    // create order with full price details
    const result = await createOrder({
      userId: user.uid,
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      latitude: form.latitude || "",
      longitude: form.longitude || "",
      paymentMethod: form.payment,
      items: cart,
      subtotal,
      deliveryFee,
      taxes,
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

  // Hydration + profile loading guard
  if (!mounted || loadingProfile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading checkout...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* FORM */}
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

            <button
              type="button"
              onClick={getCurrentLocation}
              className="mb-4 bg-blue-500 px-4 py-2 rounded-lg"
            >
              📍 Use Current Location
            </button>

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
                  checked={form.payment === "cod"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      payment: e.target.value,
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
                  checked={form.payment === "upi"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      payment: e.target.value,
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

          {/* ORDER SUMMARY */}
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-zinc-400">
                  Your cart is empty
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹
                      {Number(item.price || 0) *
                        Number(item.quantity || 0)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-700 mt-6 pt-6 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>

                <div className="flex justify-between text-xl font-bold pt-2 border-t border-zinc-700">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}