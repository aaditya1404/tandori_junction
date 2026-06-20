// "use client";

// import Link from "next/link";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { getHeroData } from "@/services/homeService";

// export default function Hero() {
//   const [hero, setHero] = useState(null);

//   useEffect(() => {
//     loadHero();
//   }, []);

//   const loadHero = async () => {
//     const result = await getHeroData();
//     if (result.success) {
//       setHero(result.data);
//     }
//   };

//   if (!hero) {
//     return (
//       <section
//         className="
//         h-screen
//         flex
//         items-center
//         justify-center
//         bg-black
//         text-white
//         "
//       >
//         Loading...
//       </section>
//     );
//   }

//   return (
//     <section
//       style={{
//         backgroundImage: `url(${hero.image})`,
//       }}
//       className="
//       h-screen
//       bg-cover
//       bg-center
//       relative
//       flex
//       items-center
//       "
//     >
//       <div
//         className="
//         absolute
//         inset-0
//         bg-black/60
//         "
//       />

//       <div
//         className="
//         relative
//         z-10
//         max-w-7xl
//         mx-auto
//         px-6
//         "
//       >
//         <motion.h1
//           initial={{
//             opacity: 0,
//             y: 50,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.8,
//           }}
//           className="
//           text-5xl
//           md:text-7xl
//           font-bold
//           text-white
//           "
//         >
//           {hero.title}
//         </motion.h1>

//         <motion.p
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             delay: 0.3,
//           }}
//           className="
//           text-gray-200
//           mt-4
//           max-w-xl
//           text-lg
//           "
//         >
//           {hero.subtitle}
//         </motion.p>

//         <div
//           className="
//           flex
//           gap-4
//           mt-8
//           flex-wrap
//           "
//         >
//           <Link
//             href="/menu"
//             className="
//             bg-orange-600
//             hover:bg-orange-700
//             transition
//             px-6
//             py-3
//             rounded-lg
//             text-white
//             "
//           >
//             {hero.buttonText}
//           </Link>

//           <Link
//             href="/menu"
//             className="
//             border
//             border-white
//             text-white
//             px-6
//             py-3
//             rounded-lg
//             hover:bg-white
//             hover:text-black
//             transition
//             "
//           >
//             View Menu
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


import React from "react";
import { Bonheur_Royale } from "next/font/google";
import { Cinzel } from "next/font/google";


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
        <h1 className="text-white text-4xl md:text-6xl lg:text-9xl font-bold text-center text-shadow-md text-shadow-white">
          Welcome to
          <span className="text-orange-500 text-shadow-md text-shadow-orange-500">
            {" "}Tandoori Junction
          </span>
        </h1>
        <h3 className="text-5xl text-white">The Taste of Royality</h3>

        {/* Buttons */}
        <div className="mt-8 flex sm:flex-row gap-4">
          <button className={`${cinzel.className} px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-lg`}>
            Order Now
          </button>

          <button className={`${cinzel.className} px-8 py-3 border-2 border-white text-white rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105 active:scale-95`}>
            View Menu
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
