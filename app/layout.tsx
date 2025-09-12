import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import NavBarAfterLogin from "@/components/NavBar/NavBarAfterLogin";

export const metadata: Metadata = {
  title: "UnivVault",
  description: "University Assistant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let isLoggedIn = false;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      isLoggedIn = true;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return (
    <html lang="en">
      <body>
        {isLoggedIn ? <NavBarAfterLogin /> : <NavBar />}
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </body>
    </html>
  );
}
