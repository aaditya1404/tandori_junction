"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (user.role !== "superadmin") {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminTopbar />

        <main className="flex-1 overflow-y-auto bg-[#050505]">
          {children}
        </main>
      </div>
    </div>
  );
}