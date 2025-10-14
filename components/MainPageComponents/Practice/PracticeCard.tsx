'use client'

import Image from "next/image";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

interface PracticeCardProps {
    prac:{
        c_name: string;
        con_points: number;
        course_id: number;
        file_location: string;
        q_id: number;
        q_title: string;
        q_type: string;
        year: number,
        provider_id: number;
        t_name: string;
        name: string;
        batch: string;
        dept: string;
        t_designation: string;
        t_dept_name: string;
    }
}



export default function PracticeCard(props : PracticeCardProps)
{
    const [showPreview, setShowPreview] = useState(false);
    const [isImage, setIsImage] = useState(props.prac.file_location.match(/\.(jpeg|jpg|gif|png|svg)$/) != null);
    return(
        <div className="card bg-neutral-800/50 shadow-sm w-fit flex flex-row">
            {/*I wanna show a preview of the document in here. The preview will be its first page*/}
            <div className="card-body w-80">
                <h2 className="card-title mb-6">{props.prac.q_title}</h2>
                <div className="*:m-1 bg-black/10 flex flex-wrap gap-1 rounded-2xl">
                    <div className="w-fit *:ml-1 flex flex-row">
                        <div>{props.prac.q_type=="term"? <>Semester Final</> : props.prac.q_type=="ct"? <>Class Test</>:<>Books / others ...</>}</div>
                        <div className="w-fit p-1 text-white/10">taken in {props.prac.year}</div>
                    </div>
                </div> 
                {props.prac.t_name &&
                <div className="*:m-1 bg-black/10 flex flex-wrap gap-1 rounded-2xl">
                    <div className="w-fit *:ml-1">
                        <div>{props.prac.t_name}</div>
                        <div className=" w-fit text-xs text-white/20">{props.prac.t_designation}</div>
                    </div>
                </div> 
                }
                
                <div className="*:m-1 bg-black/10 flex flex-wrap gap-1 rounded-2xl">
                    <p className="text-xs my-auto">Contributed by</p>
                    <div className="badge w-fit">
                        {props.prac.name}
                        <div className="w-fit p-1 text-white/10">{props.prac.dept}</div>    
                        <div className="w-fit p-1 text-white/10">{props.prac.batch}</div>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    {props.prac.file_location && !showPreview && (
                        <a
                        href={props.prac.file_location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost"
                        onClick={()=>{if(isImage) setShowPreview(!showPreview);}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-view-icon lucide-view"><path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/><path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/><circle cx="12" cy="12" r="1"/><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/></svg>
                        </a>
                    )}
                    <button className="btn btn-ghost" title="Download"
                    onClick={() => {
                        const link = document.createElement("a");
                        link.href = props.prac.file_location;
                        link.download = props.prac.q_title; // optional: default file name
                        link.click();
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {
                    showPreview && isImage &&
                    <motion.div
                    initial={{opacity: 0, width:0}}
                    animate={{ opacity: 1, width: 'auto'}}
                    exit={{opacity: 0, width: 0}}
                    transition={{duration: 0.3}}
                    className="m-2"
                    >

                        <Image alt={`preview of ${props.prac.q_title}`} src={props.prac.file_location} width={800} height={200} onClick={()=>setShowPreview(false)}/>
                    </motion.div>
                }    
            </AnimatePresence>
            
        </div>
    );
}