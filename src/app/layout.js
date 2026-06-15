import "./globals.css";

export const metadata = {
  title: "Tandoori Junction",
  description: "Restaurant Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}