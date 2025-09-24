import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metada içeriği
export const metadata = {
  title: {
    default: "Amazon", // varsayılan title
    template: "%s | Amazon", // özelleştirme
  },
  description: "Dünyanın en iyi alışveriş sitesi..",
  author: "yapımcı",
  keywords: ["alışveriş", "ürün", "amazon"],
};

// Higher Order Component - HOC
// Layout component'ları ekran basılan sayfa içeriğine children propuyla erişir
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <header className="text-center p-4 font-semibold border-b">Header</header>

        <main className="flex-1">{children}</main>

        <footer className="text-center p-4 font-semibold border-t">Footer</footer>
      </body>
    </html>
  );
}
