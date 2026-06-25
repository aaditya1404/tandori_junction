// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//     LayoutDashboard,
//     ShoppingBag,
//     UtensilsCrossed,
//     Users,
//     TicketPercent,
//     IndianRupee,
//     Wallet,
//     ChartColumn,
//     TrendingUp,
//     Image,
//     LogOut,
//     Menu,
//     X,
// } from "lucide-react";

// const menuItems = [
//     {
//         name: "Dashboard",
//         href: "/admin/dashboard",
//         icon: LayoutDashboard,
//     },
//     {
//         name: "Orders",
//         href: "/admin/orders",
//         icon: ShoppingBag,
//     },
//     {
//         name: "Walk-In",
//         href: "/admin/walkin-order",
//         icon: UtensilsCrossed,
//     },
//     {
//         name: "Users",
//         href: "/admin/users",
//         icon: Users,
//     },
//     {
//         name: "Coupons",
//         href: "/admin/coupons",
//         icon: TicketPercent,
//     },
//     {
//         name: "Revenue",
//         href: "/admin/revenue",
//         icon: IndianRupee,
//     },
//     {
//         name: "Expenses",
//         href: "/admin/expenses",
//         icon: Wallet,
//     },
//     {
//         name: "Top Selling",
//         href: "/admin/top-selling",
//         icon: TrendingUp,
//     },
//     {
//         name: "Sales",
//         href: "/admin/sales",
//         icon: ChartColumn,
//     },
//     {
//         name: "Menu Hero",
//         href: "/admin/menu-hero",
//         icon: Image,
//     },
// ];

// export default function AdminSidebar() {
//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             {/* Mobile Menu Button */}
//             <button
//                 onClick={() => setOpen(true)}
//                 className="fixed top-5 left-5 z-50 lg:hidden bg-zinc-900 p-2 rounded-xl border border-zinc-700"
//             >
//                 <Menu size={24} />
//             </button>

//             {/* Overlay */}
//             {open && (
//                 <div
//                     onClick={() => setOpen(false)}
//                     className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                 />
//             )}

//             {/* Sidebar */}
//             <aside
//                 className={`
//           fixed lg:static
//           top-0 left-0
//           z-50
//           min-h-screen
//           w-50
//           bg-[#090909]
//           border-r border-zinc-800
//           p-6
//           transform
//           transition-transform
//           duration-300
//           ${open ? "translate-x-0" : "-translate-x-full"
//                     }
//           lg:translate-x-0
//         `}
//             >
//                 {/* Close Button */}
//                 <div className="flex justify-between items-center mb-10 lg:hidden">
//                     <h1 className="text-2xl font-bold text-orange-500">
//                         Tandoori
//                     </h1>

//                     <button onClick={() => setOpen(false)}>
//                         <X />
//                     </button>
//                 </div>

//                 {/* Desktop Logo */}
//                 <h1 className="hidden lg:block text-3xl font-bold text-orange-500 mb-10">
//                     Tandoori
//                 </h1>

//                 <div className="space-y-2">

//                     {menuItems.map((item) => {
//                         const Icon = item.icon;

//                         return (
//                             <Link
//                                 key={item.name}
//                                 href={item.href}
//                                 onClick={() => setOpen(false)}
//                                 className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition"
//                             >
//                                 <Icon size={20} />

//                                 <span>{item.name}</span>
//                             </Link>
//                         );
//                     })}

//                     <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition mt-4">
//                         <LogOut size={20} />

//                         Logout
//                     </button>

//                 </div>
//             </aside>
//         </>
//     );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    ShoppingBag,
    UtensilsCrossed,
    Users,
    TicketPercent,
    IndianRupee,
    Wallet,
    ChartColumn,
    TrendingUp,
    Image,
    LogOut,
    Menu,
    X,
} from "lucide-react";

const menuItems = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
    },
    {
        name: "Walk-In",
        href: "/admin/walkin-order",
        icon: UtensilsCrossed,
    },
    {
        name: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        name: "Coupons",
        href: "/admin/coupons",
        icon: TicketPercent,
    },
    {
        name: "Revenue",
        href: "/admin/revenue",
        icon: IndianRupee,
    },
    {
        name: "Expenses",
        href: "/admin/expenses",
        icon: Wallet,
    },
    {
        name: "Top Selling",
        href: "/admin/top-selling",
        icon: TrendingUp,
    },
    {
        name: "Sales",
        href: "/admin/sales",
        icon: ChartColumn,
    },
    {
        name: "Menu Hero",
        href: "/admin/menu-hero",
        icon: Image,
    },
];

export default function AdminSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed top-5 left-5 z-20 lg:hidden bg-zinc-900 border border-zinc-700 rounded-xl p-2"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-64
          bg-[#090909]
          border-r
          border-zinc-800
          overflow-y-auto
          overflow-x-hidden
          transition-transform
          duration-300
          transform
          ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
          lg:translate-x-0
        `}
            >
                <div className="p-6">
                    {/* Mobile Header */}
                    <div className="flex justify-between items-center mb-10 lg:hidden">
                        <h1 className="text-2xl font-bold text-orange-500">
                            Tandoori
                        </h1>

                        <button
                            onClick={() => setOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Desktop Logo */}
                    <h1 className="hidden lg:block text-3xl font-bold text-orange-500 mb-10">
                        Tandoori
                    </h1>

                    {/* Menu */}
                    <div className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-zinc-800
                    transition
                  "
                                >
                                    <Icon size={20} />

                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}

                        <button
                            className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                hover:bg-red-500
                transition
                mt-6
              "
                        >
                            <LogOut size={20} />

                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}