'use client'

import UsernameInput from "@/components/JoinComponents/UsernameInput";
import PasswordInput from "@/components/JoinComponents/PasswordInput";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { Jost } from "next/font/google";
import SignUpWithOthers from "@/components/JoinComponents/SignUpWithOthers";
import EmailInput from "@/components/JoinComponents/EmailInput";
import RePasswordInput from "@/components/JoinComponents/RePasswordInput";
import PhoneInput from "@/components/JoinComponents/PhoneInput";
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

    const [uname , setUname] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [repassword , setRePassword] = useState('');
    const [phone , setPhone] = useState('');
    const [university , setUniversity] = useState('KUET');
    const [batch , setBatch] = useState('2021');
    const [dept , setdept] = useState('CSE');

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            const res = await fetch('/api/auth/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:uname,
                    phone: phone,
                    email: email,
                    pw : password,
                    institution: university,
                    batch:batch,
                    dept:dept,
                    contribution_points:0,
                    role:'student'
                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert('Account created successfully!');
                window.location.href = '/login';
            } else {
                alert(`Error: ${data.error}`);
            }
        }
        catch(error){
            console.error(error);
        } 
    }

    function allOk(){
        if (!!(uname.trim() && email.trim() && phone.trim() && university && batch && dept)){
            if(password === repassword && password.trim()!=''){
                return true;
            }
        }
    }

  return (
    <PageTransitionWrapper>
      <div className={`card lg:card-side bg-black/30 shadow-xl w-fit ml-0 md:ml-5 lg:mx-auto mt-2 md:mt-3 grid grid-rows-[2fr_1fr] lg:grid-cols-[2fr_1fr] lg:grid-rows-1`}>
        <form onSubmit={handleSubmit}>
            <div className="card-body mx-3">
                <div className="mb-4 w-80">
                    <h1 className={` ${jost.className} card-title text-6xl font-bold text-white`}>Join UnivVault</h1>
                    <h3 className={`${jost2.className}card-title text-md text-white my-5`}>Get access to study materials of your need from millions of students around the world</h3>
                </div>
                <div className="flex flex-row gap-2">
                    <UsernameInput val={uname} onchange={setUname}/>
                    <EmailInput val={email} onchange={setEmail}/>
                </div>
                <div className="flex flex-row gap-2">
                    <PasswordInput val={password} onchange={setPassword}/>
                    <RePasswordInput val={repassword} onchange={setRePassword}/>
                </div>
                <div>
                    <PhoneInput val={phone} onchange={setPhone}/>
                </div>
                <div className="flex flex-row gap-5">
                    <label className="label">University *</label>
                    <select value={university}  onChange={(e) => setUniversity(e.target.value)} className="select select-success">
                        <option>KUET</option>
                    </select>
                </div>            
                <div className="flex flex-row gap-12">
                    <label className="label">Batch *</label>
                    <select value={batch} className="select select-success" onChange={(e) => setBatch(e.target.value)}>
                        <option disabled>Choose your University</option>
                        {Array.from({ length: 2024 - 2001 + 1 }, (_, i) => {
                            const year = 2001 + i;
                            return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                            );
                        })}
                    </select>    
                </div>
                <div className="flex flex-row gap-2">
                    <label className="label">Department *</label>
                    <select value={dept} className="select select-success" onChange={(e) => setdept(e.target.value)}>
                        <option>CSE</option>
                    </select>
                </div>  
            <button type='submit' onClick={handleSubmit} className={` ${allOk() ? '' : 'opacity-50 pointer-events-none'} btn btn-xs h-10 lg:w-20 md:w-10 bg-blue-950 mt-5 flex flex-row align-items`}>Join</button>
            <br/>
            </div>

        </form>
        
        <SignUpWithOthers check = {!!(university && batch && dept)}/>
      </div>
    </PageTransitionWrapper>
    
  );
}