"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const COLORS = {
    pending: "#eab308",
    preparing: "#3b82f6",
    out_for_delivery: "#f97316",
    delivered: "#22c55e",
    cancelled: "#ef4444",
};

export default function OrdersOverview({ orders = [] }) {
    // Count directly from Firestore orders
    const counts = {
        pending: 0,
        preparing: 0,
        out_for_delivery: 0,
        delivered: 0,
        cancelled: 0,
    };

    orders.forEach((order) => {
        if (counts.hasOwnProperty(order.status)) {
            counts[order.status]++;
        }
    });

    const data = [
        {
            name: "Pending",
            key: "pending",
            value: counts.pending,
        },
        {
            name: "Preparing",
            key: "preparing",
            value: counts.preparing,
        },
        {
            name: "Out For Delivery",
            key: "out_for_delivery",
            value: counts.out_for_delivery,
        },
        {
            name: "Delivered",
            key: "delivered",
            value: counts.delivered,
        },
        {
            name: "Cancelled",
            key: "cancelled",
            value: counts.cancelled,
        },
    ];

    const totalOrders = orders.length;

    return (
        <div className="rounded-3xl border border-zinc-800 bg-[#0b0b0b] p-4 sm:p-5 lg:p-6 h-[430px] w-full flex flex-col overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-bold">
                Orders Overview
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500">
                Live Order Distribution
            </p>
            <div className="flex-1 overflow-y-auto no-scrollbar">

                <div className="flex flex-col items-center w-full">


                    <div className="relative h-[300px] w-full lg:-mb-10">
                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie
                                    data={data}
                                    dataKey="value"
                                    innerRadius="65%"
                                    outerRadius="95%"
                                    stroke="none"
                                >
                                    {data.map((item) => (
                                        <Cell
                                            key={item.key}
                                            fill={COLORS[item.key]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                                {totalOrders}
                            </h2>

                            <p className="text-xs sm:text-sm text-zinc-500">
                                Orders
                            </p>

                        </div>

                    </div>
                </div>

                <div className="w-full space-y-2">
                    {data.map((item) => (

                        <div
                            key={item.key}
                            className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3 text-sm border border-zinc-800"
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="h-3 w-3 rounded-full"
                                    style={{
                                        backgroundColor: COLORS[item.key],
                                    }}
                                />

                                {item.name}

                            </div>

                            <span className="font-semibold">
                                {item.value}
                            </span>

                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}