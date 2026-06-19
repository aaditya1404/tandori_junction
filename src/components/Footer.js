"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getRestaurantInfo,
} from "@/services/settingsService";

export default function Footer() {

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

    <footer
      className="
      bg-zinc-950
      text-white
      border-t
      border-zinc-800
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-16
        "
      >

        <div
          className="
          grid
          md:grid-cols-4
          gap-10
          "
        >

          <div>

            <h2
              className="
              text-3xl
              font-bold
              text-orange-500
              "
            >
              Tandoori Junction
            </h2>

            <p
              className="
              text-zinc-400
              mt-4
              "
            >
              Authentic Indian,
              Chinese, Tandoor
              and Fast Food
              prepared with
              fresh ingredients.
            </p>

          </div>

          <div>

            <h3
              className="
              text-lg
              font-semibold
              mb-4
              "
            >
              Contact
            </h3>

            <div
              className="
              space-y-3
              text-zinc-400
              "
            >

              <p>
                📍 {info.address}
              </p>

              <p>
                📞 {info.phone}
              </p>

              <p>
                ✉️ {info.email}
              </p>

            </div>

          </div>

          <div>

            <h3
              className="
              text-lg
              font-semibold
              mb-4
              "
            >
              Opening Hours
            </h3>

            <p
              className="
              text-zinc-400
              "
            >
              ⏰ {info.openingHours}
            </p>

          </div>

          <div>

            <h3
              className="
              text-lg
              font-semibold
              mb-4
              "
            >
              Follow Us
            </h3>

            <div
              className="
              flex
              gap-4
              "
            >

              <a
                href={
                  info.facebook
                }
                target="_blank"
                className="
                bg-zinc-800
                hover:bg-orange-500
                transition
                px-4
                py-2
                rounded-lg
                "
              >
                Facebook
              </a>

              <a
                href={
                  info.instagram
                }
                target="_blank"
                className="
                bg-zinc-800
                hover:bg-orange-500
                transition
                px-4
                py-2
                rounded-lg
                "
              >
                Instagram
              </a>

            </div>

          </div>

        </div>

        <div
          className="
          border-t
          border-zinc-800
          mt-12
          pt-6
          text-center
          text-zinc-500
          "
        >

          © {new Date().getFullYear()}
          {" "}
          Tandoori Junction.
          All Rights Reserved.

        </div>

      </div>

    </footer>

  );

}