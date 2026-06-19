"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getRestaurantInfo,
} from "@/services/settingsService";

export default function Contact() {

  const [info,
    setInfo] =
    useState(null);

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      const result =
        await getRestaurantInfo();

      if (
        result.success
      ) {

        setInfo(
          result.data
        );

      }

    };

  if (!info) {

    return null;

  }

  return (

    <section className="py-24 bg-black text-white">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          Contact Us
        </h2>

        <div className="space-y-6 text-center">

          <p>
            📍 {info.address}
          </p>

          <p>
            📞 {info.phone}
          </p>

          <p>
            ✉️ {info.email}
          </p>

          <p>
            ⏰ {info.openingHours}
          </p>

        </div>

      </div>

    </section>

  );

}