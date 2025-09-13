import LandingPage from "@/components/LandingPage/LandingPage";
import OpeningPage from "@/components/MainPageComponents/OpeningPage";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function Home() {
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
    <div>
      {!isLoggedIn ? <LandingPage /> : <OpeningPage />}
    </div>
  );
}
