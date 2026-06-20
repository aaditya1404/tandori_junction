"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getMenuHero,
  updateMenuHero,
} from "@/services/settingsService";

export default function MenuHeroPage() {

  const [form,
    setForm] =
    useState({

      restaurantName: "",

      cuisine: "",

      rating: "",

      reviews: "",

      deliveryTime: "",

      ordersDelivered: "",

      offer1: "",

      offer2: "",

      offer3: "",

    });

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      const result =
        await getMenuHero();

      if (
        result.success
      ) {

        setForm(
          result.data
        );

      }

    };

  const handleSave =
    async () => {

      const result =
        await updateMenuHero(
          form
        );

      if (
        result.success
      ) {

        alert(
          "Updated Successfully"
        );

      }

    };

  

    return (

  <div
    className="
    min-h-screen
    bg-zinc-900
    text-white
    p-8
    "
  >

    <h1
      className="
      text-4xl
      font-bold
      mb-8
      "
    >
      Menu Hero Settings
    </h1>

    <div
      className="
      max-w-2xl
      space-y-4
      "
    >

      <input
        type="text"
        placeholder="Restaurant Name"
        value={form.restaurantName}
        onChange={(e) =>
          setForm({
            ...form,
            restaurantName:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <input
        type="text"
        placeholder="Cuisine"
        value={form.cuisine}
        onChange={(e) =>
          setForm({
            ...form,
            cuisine:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <input
        type="text"
        placeholder="Rating"
        value={form.rating}
        onChange={(e) =>
          setForm({
            ...form,
            rating:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <input
        type="text"
        placeholder="Reviews"
        value={form.reviews}
        onChange={(e) =>
          setForm({
            ...form,
            reviews:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <input
        type="text"
        placeholder="Delivery Time"
        value={form.deliveryTime}
        onChange={(e) =>
          setForm({
            ...form,
            deliveryTime:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <input
        type="text"
        placeholder="Orders Delivered"
        value={form.ordersDelivered}
        onChange={(e) =>
          setForm({
            ...form,
            ordersDelivered:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <input
        type="text"
        placeholder="Offer 1"
        value={form.offer1}
        onChange={(e) =>
          setForm({
            ...form,
            offer1:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <input
        type="text"
        placeholder="Offer 2"
        value={form.offer2}
        onChange={(e) =>
          setForm({
            ...form,
            offer2:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <input
        type="text"
        placeholder="Offer 3"
        value={form.offer3}
        onChange={(e) =>
          setForm({
            ...form,
            offer3:
              e.target.value,
          })
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-zinc-800
        "
      />

      <button
        onClick={
          handleSave
        }
        className="
        bg-green-500
        hover:bg-green-600
        px-6
        py-3
        rounded-lg
        "
      >
        Save Changes
      </button>

    </div>

  </div>

);

}