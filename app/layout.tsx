import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="docs-layout">
          <Sidebar />
          <main className="docs-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
