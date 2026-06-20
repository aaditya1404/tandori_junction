import React from "react";
import { Bonheur_Royale } from "next/font/google";
import { Cinzel } from "next/font/google";
import Link from "next/link";


const bonheurRoyale = Bonheur_Royale({
  subsets: ["latin"],
  weight: "400",
});


const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/heroBgVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Center Content */}
      <div className={`${bonheurRoyale.className} relative z-10 flex flex-col items-center justify-center w-full h-full px-4`}>
        <h1 className="text-white text-7xl md:text-6xl lg:text-9xl font-bold text-center text-shadow-md text-shadow-white">
          Welcome to
          <span className="text-orange-500 text-shadow-md text-shadow-orange-500">
            {" "}Tandoori Junction
          </span>
        </h1>
        <h3 className="text-4xl lg:text-5xl">The Taste of Royality</h3>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className={`${cinzel.className} px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-lg`}>
            <Link href={"/menu"}>Order Now</Link>
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;