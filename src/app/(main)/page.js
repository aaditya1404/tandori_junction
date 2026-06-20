import Hero from "@/components/homePage/Hero";
import Categories from "@/components/homePage/Categories";
import BestSellers from "@/components/homePage/BestSellers";
import Testimonials from "@/components/homePage/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <>
            <Hero />
            <Categories />
            <BestSellers />
            <Testimonials />
            <Contact />
        </>
    );
}