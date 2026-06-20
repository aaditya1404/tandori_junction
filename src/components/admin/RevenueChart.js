"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function RevenueChart({ orders }) {
    const revenueMap = {};

    orders.forEach((order) => {
        if (!order.createdAt?.seconds) return;

        const date = new Date(order.createdAt.seconds * 1000);

        const key = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

        revenueMap[key] =
            (revenueMap[key] || 0) + Number(order.total || 0);
    });

    const chartData = Object.entries(revenueMap).map(
        ([date, revenue]) => ({
            date,
            revenue,
        })
    );

    return (
        <div className="rounded-3xl border border-zinc-800 bg-[#0b0b0b] p-4 sm:p-5 lg:p-6 h-[320px] sm:h-[380px] lg:h-[430px] w-full">            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">

            <div>

                <h2 className="text-xl sm:text-2xl font-bold">
                    Revenue Overview
                </h2>

                <p className="text-xs sm:text-sm text-zinc-500">
                    Revenue generated from all orders
                </p>

            </div>

        </div>

            <ResponsiveContainer width="100%" height="85%">

                <AreaChart data={chartData}>

                    <defs>

                        <linearGradient
                            id="orangeGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="0%"
                                stopColor="#f97316"
                                stopOpacity={0.8}
                            />

                            <stop
                                offset="100%"
                                stopColor="#f97316"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid
                        stroke="#27272a"
                        strokeDasharray="4 4"
                    />

                    <XAxis
                        dataKey="date"
                        stroke="#71717a"
                        fontSize={12}
                        tickMargin={10}
                    />

                    <YAxis
                        stroke="#71717a"
                        fontSize={12}
                        tickMargin={10}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#18181b",
                            border: "1px solid #3f3f46",
                            borderRadius: "12px",
                            color: "#fff",
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#f97316"
                        strokeWidth={3}
                        fill="url(#orangeGradient)"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>
    );
}