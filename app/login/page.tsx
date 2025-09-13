'use client'



import UsernameInput from "@/components/LoginComponents/UsernameInput";
import PasswordInput from "@/components/LoginComponents/PasswordInput";
import Image from "next/image";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { Jost } from "next/font/google";
import LoginWithOthers from "@/components/LoginComponents/LoginWithOthers";
import { useState } from "react";

const jost = Jost({
  subsets:["latin"],
  weight:["600"],
});
const jost2 = Jost({
  subsets:["latin"],
  weight:["100"],
});

export default function Page() {
  const [email , setEmail] = useState('');
  const [pw , setpw] = useState('');
  const [clickedLogin, setClickedLogin] = useState(false);
  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    try{
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                pw : pw,
            }),
        });
        const data = await res.json();
        if (res.ok) {
            // Save the token in localStorage or cookies
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } else {
            alert(`Error: ${data.error}`);
        }
    }catch(err){
        console.error('An unexpected error occurred:', err);
        alert('An unexpected error occurred. Please try again later.');
    }
  }
  return (
    <PageTransitionWrapper>
      <div className={` card lg:card-side bg-black/30 shadow-xl w-fit mx-auto mt-2 md:mt-3`}>
        <figure>
          <Image src="/assets/images/study_night2.jpg" alt="Studying in the dark" width={550} height={400} className="w-80 rounded-xl p-0 mt-1"/>
        </figure>
        <div className="card-body mx-3">
          <div className="mb-4 w-80">
            <h1 className={` ${jost.className} card-title text-6xl font-bold text-white`}>Login</h1>
            <h3 className={`${jost2.className}card-title text-md text-white my-5`}>Access study materials of your need from millions of students around the world</h3>
          </div>
          <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>

            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" onChange={(e)=>{setpw(e.target.value)}} />

            {!clickedLogin? 
            <button onClick={()=>{setClickedLogin(true)}} type="submit" className="btn btn-neutral mt-4">Login</button> : <button className="btn"><span className="loading loading-spinner"></span>Logging in</button>}
          </fieldset>
          </form>
          <h1 className='mx-auto mt-2 mb-0'>or</h1>
          <br/>
          <LoginWithOthers />

        </div>
      </div>
    </PageTransitionWrapper>
    
  );
}