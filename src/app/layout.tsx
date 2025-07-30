import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "Home | Luân HomePage",
  description: "Welcome to Luân's homepage",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
