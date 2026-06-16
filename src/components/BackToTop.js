"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setShow(window.scrollY > 300);

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="
      fixed
      bottom-6
      left-6
      z-50
      bg-orange-500
      w-12
      h-12
      rounded-full
      "
    >
      ↑
    </button>
  );
}