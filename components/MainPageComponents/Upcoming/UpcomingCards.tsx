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
    const [addMaterial, setAddMaterial] = useState<boolean>(false);
    const [mid, setMid] = useState<number>();
    const [materials, setMaterials] = useState<Array<{ m_id: number; m_title: string; m_type: string }>>([]);
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
        now.setDate(now.getDate()+1);
        const eventDate = new Date(event.sch_date);
        const diffTime = eventDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 1) return `${diffDays} days left`;
        else if(diffDays === 1) return "Tomorrow";
        else if(diffDays === 0) return "Today";
        else return "Passed";
    }
    const fetchMaterials = async (course_id:number) => {
        try {
            const res = await fetch('/api/getMaterials', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course_id }),
            });
            const data = await res.json();

            setMaterials(data.materials);
        } catch (err) {
            console.error('Error fetching materials:', err);
        }
    };
    return(
        <div className={`m-4 ${f1.className} flex flex-row justify-center min-h-[45dvh] h-fit`}>
            {event.sch_type == 'ct' || event.sch_type== 'assignment'?
            <div className="card bg-black/20 text-primary-content w-[23vw]">
                <div className="card-body">
                    <h1 className={`badge badge-lg p-8 w-full rounded-2xl text-4xl ${event.sch_type == "ct"? "bg-blue-800":"bg-yellow-900"}`}>
                        {event.sch_type == "ct"? "Test":"Assignment"}
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
                        <button className="btn" onClick={()=>{setShowMaterials(!showMaterials);setAddMaterial(false)}}>{showMaterials? "Collapse":"View materials"}</button>
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
            <div className="flex flex-col">
                <div className="flex flex-row">
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
                <div>
                    <AnimatePresence>
                        {showMaterials &&
                        <motion.button className={` btn ${addMaterial? 'btn-warning':'btn-dash'} m-3`}
                        key={"addBtn"}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        onClick={()=>
                        {
                            setAddMaterial(!addMaterial);
                            fetchMaterials(event.sch_course.c_id);
                        }}>
                            {addMaterial? "Cancel" : "+ Add"}
                        </motion.button>}
                        {addMaterial &&
                        <div className="flex flex-row m-3">
                            <select defaultValue="Pick a material : 1" className="select select-primary"
                            onChange=
                            {(e)=>
                                {
                                    setMid(Number(e.target.value));
                                }
                            }
                            >
                                <option disabled={true}>Pick a material : 1</option>
                                <option disabled={true}>If you don{`'`}t see your desired material, you should upload it first.</option>
                                
                                {
                                    materials.map((material)=>
                                    (
                                        <option key={material.m_id} value={material.m_id} className="flex flex-row">
                                            {material.m_title}
                                            {<div className={`badge ${material.m_type=="note"?"badge-secondary" : material.m_type=="slide"?"badge-primary":"badge-info"} ml-2`}>{material.m_type}</div>}
                                        </option>
                                    ))
                                }
                            </select>
                            <button className="btn btn-success ml-2"
                            onClick={()=>
                                {
                                    if(event.sch_materials.find(m => m.m_id === mid)){
                                        <h1 className="text-sm text-green-500">Material already added.</h1>
                                        return;
                                    }
                                    if(event.sch_materials.length == 5){
                                        <h1 className="text-sm text-red-600">No more materials can be added.</h1>
                                        return;
                                    }
                                    // API call to add material to schedule
                                    fetch('/api/addMaterialToSchedule', {
                                        method: "POST",
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({ sch_id: event.sch_id, m_id: mid , mcount: event.sch_materials.length}),
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if(data.success){
                                            alert("Material added successfully!");
                                            setAddMaterial(false);
                                        }
                                        else{
                                            alert("Failed to add material.");
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                        alert("An error occurred.");
                                    });
                                }}
                            >Add</button>
                        </div>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}