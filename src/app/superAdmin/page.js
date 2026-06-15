"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SuperAdminPage() {
  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <h1>Super Admin Dashboard</h1>
    </ProtectedRoute>
  );
}