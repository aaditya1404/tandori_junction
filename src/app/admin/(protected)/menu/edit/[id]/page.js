"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import MenuForm from "@/components/admin/MenuForm";

import {
  getMenuItemById,
  updateMenuItem,
} from "@/services/menuService";

export default function EditMenuPage() {

  const params =
  useParams();

console.log(
  "Params:",
  params
);

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [item, setItem] =
    useState(null);

  useEffect(() => {

    loadItem();

  }, []);

  const loadItem =
    async () => {

    const result =
  await getMenuItemById(
    params.id
  );

console.log(
  "Firestore Result:",
  result
);

    if (
      result.success
    ) {

      setItem(
        result.item
      );

    }

  };

  const handleSubmit =
    async (
      formData
    ) => {

    setLoading(true);

    const result =
      await updateMenuItem(
        params.id,
        formData
      );

    setLoading(false);

    if (
      !result.success
    ) {

      alert(
        result.error
      );

      return;

    }

    alert(
      "Menu Updated Successfully"
    );

    router.push(
      "/admin/menu"
    );

  };

  if (!item) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Edit Menu Item
      </h1>

      <MenuForm
        initialData={item}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );

}