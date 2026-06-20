import Hero from "@/components/homePage/Hero";
import Categories from "@/components/homePage/Categories";
import BestSellers from "@/components/homePage/BestSellers";
import Testimonials from "@/components/homePage/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/homePage/WhatsappButton";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <BestSellers />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsappButton />

    </>
  );
}