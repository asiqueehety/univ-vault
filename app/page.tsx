'use client';
import { useEffect, useState } from 'react';
import LandingPage from "@/components/LandingPage/LandingPage";
import OpeningPage from "@/components/MainPageComponents/OpeningPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/verifyToken', {
        headers: { 'Authorization': `Bearer ${token}` },
      }).then(res => res.ok && setIsLoggedIn(true));
    }
  }, []);


  return (
    <div>
      {!isLoggedIn ? <LandingPage /> : <OpeningPage />}
    </div>
  );
}
