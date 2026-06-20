"use client";

import { ArrowUpRight } from "lucide-react";

export default function DashboardCard({
    title,
    value,
    icon: Icon,
    growth = "+0%",
}) {
    return (
        // <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#0b0b0b] p-6 transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1">

        //     {/* Glow */}
        //     <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />

        //     <div className="relative flex justify-between items-start">

        //         <div>

        //             <div className="flex items-center justify-center h-14 w-14 rounded-full bg-orange-500 mb-5">

        //                 <Icon size={28} className="text-white" />

        //             </div>

        //             <p className="text-zinc-400 text-sm">
        //                 {title}
        //             </p>

        //             <h2 className="text-4xl font-bold mt-2">
        //                 {value}
        //             </h2>

        //             <div className="flex items-center gap-1 mt-4 text-green-500 text-sm">

        //                 <ArrowUpRight size={16} />

        //                 <span>{growth}</span>

        //             </div>

        //         </div>

        //         {/* Placeholder for sparkline */}
        //         <div className="flex items-end h-full opacity-30">

        //             <div className="h-10 w-1 rounded-full bg-orange-500 mx-[2px]" />
        //             <div className="h-6 w-1 rounded-full bg-orange-500 mx-[2px]" />
        //             <div className="h-14 w-1 rounded-full bg-orange-500 mx-[2px]" />
        //             <div className="h-8 w-1 rounded-full bg-orange-500 mx-[2px]" />
        //             <div className="h-16 w-1 rounded-full bg-orange-500 mx-[2px]" />

        //         </div>

        //     </div>

        // </div>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#0b0b0b] p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1">

            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-3">

                <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-orange-500 mb-4">

                        <Icon
                            size={20}
                            className="text-white sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                        />

                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400">
                        {title}
                    </p>

                    <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
                        {value}
                    </h2>

                    <div className="flex items-center gap-1 mt-3 text-green-500 text-xs sm:text-sm">

                        <ArrowUpRight size={14} />

                        <span>{growth}</span>

                    </div>

                </div>

                {/* Sparkline - Hide on mobile */}
                <div className="hidden sm:flex items-end opacity-30 shrink-0">

                    <div className="h-10 w-1 rounded-full bg-orange-500 mx-[2px]" />
                    <div className="h-6 w-1 rounded-full bg-orange-500 mx-[2px]" />
                    <div className="h-14 w-1 rounded-full bg-orange-500 mx-[2px]" />
                    <div className="h-8 w-1 rounded-full bg-orange-500 mx-[2px]" />
                    <div className="h-16 w-1 rounded-full bg-orange-500 mx-[2px]" />

                </div>

            </div>

        </div>
    );
}