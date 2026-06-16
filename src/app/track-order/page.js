"use client";

export default function TrackOrderPage() {
  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      px-6
      py-20
      "
    >
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Track Order
        </h1>

        <div className="space-y-10">

          <div>
            ✅ Order Received
          </div>

          <div>
            ✅ Preparing Food
          </div>

          <div>
            🚚 Out For Delivery
          </div>

          <div className="text-zinc-500">
            🏠 Delivered
          </div>

        </div>

      </div>
    </div>
  );
}