"use client";

import { Bell, Search } from "lucide-react";

export default function AdminTopbar() {
    return (
        // <div className="h-20 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#090909]">
        //     <div>
        //         <h1 className="text-3xl font-bold">
        //             Dashboard
        //         </h1>

        //         <p className="text-zinc-400">
        //             Welcome back, Super Admin 👋
        //         </p>
        //     </div>

        //     <div className="flex items-center gap-4">
        //         <div className="flex items-center bg-zinc-900 rounded-xl px-4 py-2 border border-zinc-800">
        //             <Search size={18} />

        //             <input
        //                 placeholder="Search..."
        //                 className="bg-transparent outline-none ml-2"
        //             />
        //         </div>

        //         <button className="relative p-3 rounded-xl bg-zinc-900 border border-zinc-800">
        //             <Bell size={20} />
        //         </button>

        //         <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800">
        //             <div className="h-10 w-10 rounded-full bg-orange-500"></div>

        //             <div>
        //                 <p className="font-semibold">
        //                     Super Admin
        //                 </p>

        //                 <p className="text-xs text-zinc-400">
        //                     Admin
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="sticky top-0 z-10 h-auto min-h-20 border-b border-zinc-800 bg-[#090909] px-4 sm:px-6 lg:px-8 py-4">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Left Section */}
                {/* <div>

                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Dashboard
                    </h1>

                    <p className="text-sm text-zinc-400">
                        Welcome back, Super Admin 👋
                    </p>

                </div> */}
                <div className="ml-auto lg:ml-0 flex flex-col items-end text-right lg:items-start lg:text-left">

                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Dashboard
                    </h1>

                    <p className="text-sm text-zinc-400">
                        Welcome back, Super Admin 👋
                    </p>

                </div>

                {/* Right Section */}
                <div className="flex items-center justify-between lg:justify-end gap-3">

                    {/* Search - Hidden on Mobile */}
                    <div className="hidden md:flex items-center bg-zinc-900 rounded-xl px-4 py-2 border border-zinc-800">

                        <Search size={18} />

                        <input
                            placeholder="Search..."
                            className="bg-transparent outline-none ml-2 w-40 lg:w-56"
                        />

                    </div>

                    {/* Notification */}
                    <button className="hidden relative p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition">

                        <Bell size={20} />

                    </button>

                    {/* Profile */}
                    <div className="hidden flex items-center gap-3 bg-zinc-900 px-3 sm:px-4 py-2 rounded-xl border border-zinc-800">

                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
                            S
                        </div>

                        <div className="hidden sm:block">

                            <p className="font-semibold text-sm">
                                Super Admin
                            </p>

                            <p className="text-xs text-zinc-400">
                                Admin
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}