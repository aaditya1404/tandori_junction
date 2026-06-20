import Footer from "@/components/Footer";
import Navbar from "@/components/header/Navbar";
import WhatsappButton from "@/components/homePage/WhatsappButton";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <WhatsappButton />
        </>
    );
}