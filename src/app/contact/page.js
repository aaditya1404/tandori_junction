"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getRestaurantInfo,
} from "@/services/settingsService";

export default function ContactPage() {

  const [info,
    setInfo] =
    useState(null);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

  const result =
    await getRestaurantInfo();

  console.log(result);

  if (result.success) {

    setInfo(
      result.data
    );

  }

};

  if (!info) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-zinc-900 text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-zinc-800 p-8 rounded-xl">

          <h2 className="text-2xl font-bold mb-6">
            Restaurant Details
          </h2>

          <p className="mb-4">
            📍 {info.address}
          </p>

          <p className="mb-4">
            📞 {info.phone}
          </p>

          <p className="mb-4">
            📧 {info.email}
          </p>

          <p className="mb-4">
            ⏰ {info.openingHours}
          </p>

          <div className="flex gap-4 mt-6">

            <a
              href={
                info.facebook
              }
              target="_blank"
            >
              Facebook
            </a>

            <a
              href={
                info.instagram
              }
              target="_blank"
            >
              Instagram
            </a>

          </div>

        </div>

        <div>

          <iframe
            src={
              info.mapUrl
            }
            width="100%"
            height="400"
            loading="lazy"
            className="rounded-xl"
          />

        </div>

      </div>

    </div>

  );

}