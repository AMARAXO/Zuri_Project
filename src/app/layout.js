import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Barb Shoe Show",
  description: "Ecommerce Project By Amara",
  icons: { icon: '/starlogo.jpg' },
  image: "/starlogo.jpg",
  images: [
    {
      url: '/starlogo.jpg',
      width: 800,
      height: 600,
      alt: 'Barb Shoe Show Banner',
    },
  ],
  openGraph: {
    title: "Barb Shoe Show",
    description: "Ecommerce Project By Amara",
    images: [
      {
        url: '/starlogo.jpg',
        width: 800,
        height: 600,
        alt: 'Barb Shoe Show Banner',
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}</body>
    </html>
  );
}
