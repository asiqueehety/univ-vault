'use client'


import React from "react";
import { Jost } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";

const jost = Jost({
  subsets:["latin"],
  weight:["400"],
});

export default function LandingPage() {
  return (
    <div>
        <h1 className={`text-7xl font-bold text-center mt-20 ${jost.className}`}>
            University confuses?
            <br />
            <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness:50, delay: 0.2 }}
            className="text-7xl font-bold text-center mt-5"
            >
                Enter UnivVault!
            </motion.p>
        </h1>
    </div>
  );
}