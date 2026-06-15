"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const router = useRouter();

  const { user, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (loading) return;

    // Not logged in
    if (!user) {
      router.replace("/login");
      return;
    }

    // Role check
    if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user.profile?.role)
    ) {
      router.replace("/unauthorized");
    }
  }, [user, loading, allowedRoles, router]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return children;
}