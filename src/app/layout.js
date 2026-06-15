import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "Tandoori Junction",
  description: "Restaurant Website",
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReduxProvider>
=======
    <html lang="en">
      <body>
        {children}
>>>>>>> 1840692b0894ec5154c566bd9a8feab59cea5f18
      </body>
    </html>
  );
}