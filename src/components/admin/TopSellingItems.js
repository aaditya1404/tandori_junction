"use client";

export default function TopSellingItems({ orders = [] }) {
    const itemSales = {};

    // Calculate total quantity sold for each item
    orders.forEach((order) => {
        order.items?.forEach((item) => {
            const key = item.name;

            if (!itemSales[key]) {
                itemSales[key] = {
                    name: item.name,
                    quantity: 0,
                };
            }

            itemSales[key].quantity += Number(item.quantity || 0);
        });
    });

    // Convert to array and sort descending
    const topItems = Object.values(itemSales)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

    return (
        <div className="rounded-3xl border border-zinc-800 bg-[#0b0b0b] p-6 h-[430px] flex flex-col">
            <h2 className="text-2xl font-bold">
                Top Selling Items
            </h2>

            <p className="text-zinc-500 mb-6">
                Live data from all orders
            </p>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                {topItems.length === 0 ? (
                    <p className="text-zinc-500">
                        No sales yet.
                    </p>
                ) : (
                    topItems.map((item, index) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between rounded-2xl bg-zinc-900 px-4 py-4 border border-zinc-800"
                        >
                            <div className="flex items-center gap-4">

                                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">
                                    #{index + 1}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {item.name}
                                    </h3>

                                    <p className="text-zinc-500 text-sm">
                                        Total Sold
                                    </p>
                                </div>

                            </div>

                            <div className="text-right">

                                <p className="text-2xl font-bold text-orange-400">
                                    {item.quantity}
                                </p>

                                <p className="text-xs text-zinc-500">
                                    Items
                                </p>

                            </div>
                        </div>
                    ))
                )}

            </div>

        </div>
    );
}