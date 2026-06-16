export default function MyOrders() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        My Orders
      </h1>

      <div className="space-y-4">

        <div className="bg-zinc-900 p-5 rounded-2xl">
          <h2>#TJ1034</h2>

          <p>₹540</p>

          <p className="text-orange-500">
            Preparing
          </p>
        </div>

      </div>

    </div>
  );
}