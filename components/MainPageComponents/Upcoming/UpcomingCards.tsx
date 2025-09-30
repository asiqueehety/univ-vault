'use client'
import { motion, AnimatePresence } from "framer-motion";
import { Jost } from "next/font/google";
import { useState } from "react";

const f1 = Jost({
    subsets:["latin"],
    weight:["500"],
});

const f2 = Jost({
    subsets:["latin"],
    weight:["300"],
});

interface Scheduled{
    sch_id:number,
    sch_type:string,
    sch_date:Date,
    sch_course:
    {
        c_id:number,
        c_name:string,
        c_dept:string
    },
    sch_batch:string,
    sch_materials:
    {
        m_id:number,
        provider_id:number,
        m_type:string,
        course_id:number,
        m_title:string,
        m_description:string,
        file_location:string,
        con_points:number
    }[],
    sch_dept_name:string,
    sch_shortnote:string
}

interface schedProps{
    event: Scheduled
}

export default function UpcomingCards({event}:schedProps){
    const [showMaterials, setShowMaterials] = useState<boolean>(false);
    function formatCustomDate(date: Date): string {
        const d = new Date(date);
        const weekday = d.toLocaleString("en-US", { weekday: "short" });
        const day = d.toLocaleString("en-US", { day: "2-digit" });
        const month = d.toLocaleString("en-US", { month: "long" });
        const year = d.getFullYear();
        return `${weekday}, ${day} ${month}, ${year}`;
    }
    function when(){
        const now = new Date();
        const eventDate = new Date(event.sch_date);
        const diffTime = eventDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 1) return `${diffDays} days left`;
        else if(diffDays === 1) return "Tomorrow";
        else if(diffDays === 0) return "Today";
        else return "Passed";
    }
    return(
        <div className={`m-4 ${f1.className} flex flex-row`}>
            {event.sch_type === "ct" || "assignment"?
            <div className="card bg-black/20 text-primary-content w-96">
                <div className="card-body">
                    <h1 className={`badge badge-lg p-8 w-full rounded-2xl text-4xl ${event.sch_type ==="ct"? "bg-blue-800":"bg-yellow-900"}`}>
                        {event.sch_type ==="ct"? "Test":"Assignment"}
                    </h1>
                    <div className="flex flex-row gap-2 my-3">
                        <div className="badge badge-neutral">{event.sch_course.c_name} </div>
                        •
                        <div className="badge badge-soft">{event.sch_course.c_dept} </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="badge size-fit bg-red-950 p-3 text-xl">{formatCustomDate(event.sch_date)}</div>
                        <div className="badge size-fit p-2 m-2">{when()}</div>
                    </div>

                    <p className={` ${f2.className} my-3`}>{event.sch_shortnote}</p>
                    <div className="card-actions justify-end">
                        <button className="btn" onClick={()=>{setShowMaterials(!showMaterials)}}>View materials</button>
                    </div>
                </div>
            </div>:
            <div className="card bg-black/20 text-primary-content w-96">
                <div className="card-body">
                    <h1 className="badge badge-lg p-8 w-full rounded-2xl text-4xl bg-black">Finals</h1>
                    <div className="flex flex-row gap-2 my-3">
                        <div className="badge badge-neutral">{event.sch_course.c_name} </div>
                        •
                        <div className="badge badge-soft">{event.sch_course.c_dept} </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="badge size-fit bg-red-950 p-3 text-xl">{formatCustomDate(event.sch_date)}</div>
                        <div className="badge size-fit p-2 m-2">{when()}</div>
                    </div>
                    <p className={` ${f2.className} my-3`}>{event.sch_shortnote}</p>
                </div>
            </div>
            }
            <AnimatePresence>
            {
            showMaterials &&
            event.sch_materials.map((material) => (
                <motion.div key={material.m_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.1 }}
                >
                {
                <div className="card bg-neutral-800/50 h-fit m-2 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title mb-2">{material.m_title}</h2>
                        <div className="badge badge-neutral">{material.m_type} </div>
                        <p className="text-xs bg-teal-950 p-2 rounded-xl">{material.m_description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-ghost" title="Download"
                            onClick={() => {
                                const link = document.createElement("a");
                                link.href = material.file_location;
                                link.download = material.m_title; // optional: default file name
                                link.click();
                            }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                }
                </motion.div>
            ))
            }
            </AnimatePresence>
        </div>
    );
}