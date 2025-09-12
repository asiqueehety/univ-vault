import UsernameInput from "@/components/JoinComponents/UsernameInput";
import PasswordInput from "@/components/JoinComponents/PasswordInput";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { Jost } from "next/font/google";
import SignUpWithOthers from "@/components/JoinComponents/SignUpWithOthers";
import EmailInput from "@/components/JoinComponents/EmailInput";
import RePasswordInput from "@/components/JoinComponents/RePasswordInput";
import PhoneInput from "@/components/JoinComponents/PhoneInput";

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
      <div className={`card lg:card-side bg-black/30 shadow-xl w-fit ml-0 md:ml-5 lg:mx-auto mt-2 md:mt-3 grid grid-rows-[3fr_1fr] lg:grid-cols-[3fr_1fr] lg:grid-rows-1`}>
        <div className="card-body mx-3">
            <div className="mb-4 w-80">
                <h1 className={` ${jost.className} card-title text-6xl font-bold text-white`}>Join UnivVault</h1>
                <h3 className={`${jost2.className}card-title text-md text-white my-5`}>Get access to study materials of your need from millions of students around the world</h3>
            </div>
            <div className="flex flex-row gap-2">
                <UsernameInput />
                <EmailInput />
            </div>
            <div className="flex flex-row gap-2">
                <PasswordInput />
                <RePasswordInput />
            </div>
            <div>
                <PhoneInput />
            </div>
            <div className="flex flex-row gap-5">
                <label className="label">University</label>
                <select defaultValue="Choose your University" className="select select-success">
                    <option>KUET</option>
                </select>
            </div>            
            <div className="flex flex-row gap-12">
                <label className="label">Batch</label>
                <select defaultValue="Select your batch" className="select select-success">
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
                <label className="label">Department</label>
                <select defaultValue="Choose your Department" className="select select-success">
                    <option>CSE</option>
                </select>
            </div>  
          <button type='submit' className="btn btn-xs h-10 lg:w-20 md:w-10 bg-blue-950 mt-5 flex flex-row align-items">Join</button>
          <br/>
        </div>
        <SignUpWithOthers />
      </div>
    </PageTransitionWrapper>
    
  );
}