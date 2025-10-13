'use client';

import {useState,useEffect} from "react";
import jwt from "jsonwebtoken";
import NavBar from "@/components/NavBar/NavBar";
import NavBarAfterLogin from "@/components/NavBar/NavBarAfterLogin";



export default function TopBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/verifyToken', {
            headers: { 'Authorization': `Bearer ${token}` },
            }).then(res => res.ok && setIsLoggedIn(true));
        }
    }, []);

    return(
        <>
        {isLoggedIn? <NavBarAfterLogin /> : <NavBar />}
        </>
    );
}