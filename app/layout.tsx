import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import NavBarAfterLogin from "@/components/NavBar/NavBarAfterLogin";
import TopBar from "@/components/TopBar";

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
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
      isLoggedIn = true;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return (
    <html lang="en">
      <body>
        <TopBar/>
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </body>
    </html>
  );
}
