import Navbar from "@/components/header/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import AboutRestaurant from "@/components/AboutRestaurant";

export default function Home() {
  return (
    <>
      
      <Hero />
      <Categories />
      <BestSellers />
      {/* <AboutRestaurant/> */}
      <MenuSection />
     {/* <Gallery /> */}
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsappButton />

    </>
  );
}