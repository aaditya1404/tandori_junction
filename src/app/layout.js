import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "Tandoori Junction",
  description: "Restaurant Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}