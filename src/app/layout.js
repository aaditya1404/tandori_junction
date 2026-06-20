import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import FloatingCartButton from "@/components/FloatingCartButton";

export const metadata = {
  title: "Tandoori Junction",
  description: "Restaurant Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <ReduxProvider>
          <AuthProvider>
            <CartProvider>
              {children}
               <FloatingCartButton />
              <CartDrawer />
            </CartProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}