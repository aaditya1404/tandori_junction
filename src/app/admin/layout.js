"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import AdminOrderAlert from "@/components/admin/AdminOrderAlert";

export default function AdminLayout({
  children,
}) {
  const router = useRouter();

  const { user, loading } =
    useSelector(
      (state) => state.auth
    );

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (
      user.role !== "superadmin"
    ) {
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

  if (
    !user ||
    user.role !== "superadmin"
  ) {
    return null;
  }

  return (
    <>
      <AdminOrderAlert />
      {children}
    </>
  );
}