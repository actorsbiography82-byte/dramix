import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "DRAMIX - Watch Latest Drama Series",
  description: "Watch latest Pakistani, Turkish, Indian, and Korean drama series in HD.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f8fafc", color: "#0f172a" }}>
        {/* Header across all pages */}
        <Header />
        
        {/* Page Content */}
        {children}
        
        {/* Footer across all pages */}
        <Footer />
      </body>
    </html>
  );
}