'use client';

import {useState,useEffect} from "react";
import NavBar from "@/components/NavBar/NavBar";
import NavBarAfterLogin from "@/components/NavBar/NavBarAfterLogin";
import {motion} from "framer-motion";



export default function TopBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/verifyToken', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            }).then(res => res.ok && setIsLoggedIn(true));
        }
    }, []);

    return(
        <div>
        {!isLoggedIn && 
        <motion.div
        initial={{ y: -250}}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        >
            <NavBar />
        </motion.div>
        }
        {isLoggedIn &&
        <motion.div
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        >
            <NavBarAfterLogin />
        </motion.div>
        }
        </div>
    );
}