"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MenuForm from "@/components/admin/MenuForm";
import { createMenuItem } from "@/services/menuService";

export default function AddMenuPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const result = await createMenuItem(formData);

      if (!result.success) {
        alert(result.error);
        return;
      }

      alert("Menu item added successfully!");

      router.push("/admin/menu");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Add Menu Item
      </h1>

      <MenuForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}