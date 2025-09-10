import UsernameInput from "@/components/FormInputs/UsernameInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";

import Image from "next/image";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets:["latin"],
  weight:["600"],
});
const jost2 = Jost({
  subsets:["latin"],
  weight:["100"],
});

export default function Page() {
  return (
    <PageTransitionWrapper>
      <div className={` card lg:card-side bg-stone-950 shadow-xl w-fit mx-auto mt-50vh`}>
        <figure>
          <Image src="/assets/images/study_night.jpg" alt="Studying in the dark" width={550} height={400} className="w-80 rounded-xl p-0 mt-1"/>
        </figure>
        <div className="card-body mx-3 my-10">
          
          <div className="mb-4 w-80">
            <h1 className={` ${jost.className} card-title text-6xl font-bold text-white`}>Login</h1>
            <h3 className={`${jost2.className}card-title text-md text-white my-5`}>Access study materials of your need from millions of students around the world</h3>
          </div>
          <UsernameInput />
          <PasswordInput />
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Login</button>
        </div>
      </div>
    </PageTransitionWrapper>
    
  );
}