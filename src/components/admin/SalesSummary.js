"use client";

export default function SalesSummary({ orders = [] }) {
    const now = new Date();

    const today = now.toDateString();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    let todaySales = 0;
    let weekSales = 0;
    let monthSales = 0;
    let totalSales = 0;

    orders.forEach((order) => {
        if (!order.createdAt?.seconds) return;

        const orderDate = new Date(
            order.createdAt.seconds * 1000
        );

        const amount = Number(order.total || 0);

        totalSales += amount;

        if (orderDate.toDateString() === today) {
            todaySales += amount;
        }

        if (orderDate >= startOfWeek) {
            weekSales += amount;
        }

        if (orderDate >= startOfMonth) {
            monthSales += amount;
        }
    });

    const stats = [
        {
            title: "Today's Sales",
            value: todaySales,
        },
        {
            title: "This Week",
            value: weekSales,
        },
        {
            title: "This Month",
            value: monthSales,
        },
        {
            title: "Total Revenue",
            value: totalSales,
        },
    ];

    return (
        <div className="rounded-3xl border border-zinc-800 bg-[#0b0b0b] p-4 sm:p-5 lg:p-6 h-[350px] sm:h-[430px] w-full flex flex-col overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
                Sales Summary
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500 mb-6">
                Live revenue analytics
            </p>

            <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1 sm:pr-2">
                {stats.map((stat) => (

                    <div
                        key={stat.title}
                        className="rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800 p-3 sm:p-5"
                    >

                        <p className="text-xs sm:text-sm text-zinc-400">
                            {stat.title}
                        </p>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-orange-400 break-words">
                            ₹{stat.value.toLocaleString()}
                        </h2>

                    </div>

                ))}

            </div>

        </div>
    );
}