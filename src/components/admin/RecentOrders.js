"use client";

export default function RecentOrders({ orders = [] }) {
    const recentOrders = [...orders]
        .sort((a, b) => {
            const aTime = a.createdAt?.seconds || 0;
            const bTime = b.createdAt?.seconds || 0;

            return bTime - aTime;
        })
        .slice(0, 5);

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/20 text-yellow-400";

            case "preparing":
                return "bg-blue-500/20 text-blue-400";

            case "out_for_delivery":
                return "bg-orange-500/20 text-orange-400";

            case "delivered":
                return "bg-green-500/20 text-green-400";

            case "cancelled":
                return "bg-red-500/20 text-red-400";

            default:
                return "bg-zinc-700 text-white";
        }
    };

    return (
        <div className="rounded-3xl border border-zinc-800 bg-[#0b0b0b] p-4 sm:p-5 lg:p-6 h-[350px] sm:h-[430px] w-full flex flex-col overflow-hidden">
            <div className="mb-4 sm:mb-6">

                <h2 className="text-xl sm:text-2xl font-bold">
                    Recent Orders
                </h2>

                <p className="text-xs sm:text-sm text-zinc-500">
                    Latest orders placed
                </p>

            </div>

            <div className="flex-1 overflow-auto">

                <table className="min-w-[700px] w-full">

                    <thead>

                        <tr className="text-left text-zinc-500 border-b border-zinc-800 text-xs sm:text-sm">
                            <th className="pb-3 px-2 whitespace-nowrap">
                                Order
                            </th>

                            <th className="pb-3 px-2 whitespace-nowrap">
                                Customer
                            </th>

                            <th className="pb-3 px-2 whitespace-nowrap">
                                Amount
                            </th>

                            <th className="pb-3 px-2 whitespace-nowrap">
                                Type
                            </th>

                            <th className="pb-3 px-2 whitespace-nowrap">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {recentOrders.map((order) => (

                            <tr
                                key={order.id}
                                className="border-b border-zinc-900 hover:bg-zinc-900 transition text-sm"
                            >

                                <td className="py-3 px-2 whitespace-nowrap font-medium">
                                    #{order.id?.slice(0, 6)}
                                </td>

                                <td>
                                    {order.userName || order.name || "Guest"}
                                </td>

                                <td>
                                    ₹{order.total}
                                </td>

                                <td className="capitalize">
                                    {order.orderType}
                                </td>

                                <td>

                                    <span
                                        className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order.status.replaceAll("_", " ")}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}