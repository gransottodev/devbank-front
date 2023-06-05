import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "DevBank",
  description: "DevBank",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="w-full h-full bg-darkbg" lang="en">
      <AuthProvider>
        <body className={poppins.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
