"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  getHeroData,
} from "@/services/homeService";

export default function Hero() {

  const [hero,
    setHero] =
    useState(null);

  useEffect(() => {

    loadHero();

  }, []);

  const loadHero =
    async () => {

      const result =
        await getHeroData();

      console.log(result);

      if (
        result.success
      ) {

        setHero(
          result.data
        );

      }

    };

  if (!hero) {

    return (

      <section
        className="
        h-screen
        flex
        items-center
        justify-center
        bg-black
        text-white
        "
      >

        Loading...

      </section>

    );

  }

  return (

    <section
      style={{
        backgroundImage:
          `url(${hero.image})`,
      }}
      className="
      h-screen
      bg-cover
      bg-center
      relative
      flex
      items-center
      "
    >

      <div
        className="
        absolute
        inset-0
        bg-black/60
        "
      />

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        "
      >

        <motion.h1
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
          text-5xl
          md:text-7xl
          font-bold
          text-white
          "
        >

          {hero.title}

        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
          text-gray-200
          mt-4
          max-w-xl
          text-lg
          "
        >

          {hero.subtitle}

        </motion.p>

        <div
          className="
          flex
          gap-4
          mt-8
          flex-wrap
          "
        >

          <Link
            href="/menu"
            className="
            bg-orange-600
            hover:bg-orange-700
            transition
            px-6
            py-3
            rounded-lg
            text-white
            "
          >

            {hero.buttonText}

          </Link>

          <Link
            href="/menu"
            className="
            border
            border-white
            text-white
            px-6
            py-3
            rounded-lg
            hover:bg-white
            hover:text-black
            transition
            "
          >

            View Menu

          </Link>

        </div>

      </div>

    </section>

  );

} 