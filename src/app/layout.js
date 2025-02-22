import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto mt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
