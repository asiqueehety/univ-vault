'use client';

import Link from "next/link";
import {useState , useEffect} from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function UploadSchedule(){
    const [courses, setCourses] = useState<Array<{ c_id: number; c_name: string }>>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [type, setType] = useState("");
    const [date, setDate] = useState<Date>();
    const [materials, setMaterials] = useState<Array<{ m_id: number; m_title: string; m_type: string }>>([]);
    const [mid1, setMid1] = useState<number | null>(null);
    const [mid2, setMid2] = useState<number | null>(null);
    const [mid3, setMid3] = useState<number | null>(null);
    const [mid4, setMid4] = useState<number | null>(null);
    const [mid5, setMid5] = useState<number | null>(null);
    const [shortnote, setShortnote] = useState("");

    useEffect(() => {
        const fetchCourses = async (department : string) => {
        try {
            const res = await fetch('https://server-univ-vault.onrender.com/getCourses', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ department }),
            });
            const data = await res.json();

            setCourses(data.courses);
            }catch (err)
            {
                console.error('Error fetching courses:', err);
            }
        };
        fetchCourses("");
    },[]);

    const fetchMaterials = async (course_id:number) => {
        try {
            const res = await fetch('https://server-univ-vault.onrender.com/getMaterials', {
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

    const handleSubmit = async () => {
        if (!date || !selectedCourseId) {
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = '/login';
            return;
        }
        // Get user securely from Supabase
        const res = await fetch('https://server-univ-vault.onrender.com/getCurrentUser',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },   
        });
        const user = await res.json();

        if (!user?.user_id) {
            alert("User not logged in.");
            return;
        }

        const dept = user.dept;
        const batch = user.batch;

        const dbdata = {
            sch_date: date,
            sch_type: type,
            sch_course_id: selectedCourseId,
            sch_batch: batch,
            sch_material_1: mid1,
            sch_material_2: mid2,
            sch_material_3: mid3,
            sch_material_4: mid4,
            sch_material_5: mid5,
            sch_dept_name: dept,
            sch_shortnote: shortnote,
        }

        try {
            const res = await fetch('https://server-univ-vault.onrender.com/upload/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dbdata
                }),
            });
            const data = await res.json();
            if (res.ok) {
                window.location.href = '/';
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };
        
    return(
        <div className="min-h-screen p-4 pt-2 bg-gradient-to-b from-black/50 via-black/30 to-black/50 text-white">
            <fieldset className="fieldset bg-black/20 border-base-300 rounded-box w-xl *:w-xl border p-4 mx-auto my-auto">
                <legend className="fieldset-legend text-3xl">Set Upcoming Schedule</legend>
                
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Type</legend>
                    <select defaultValue="Select a type" className="select"
                    onChange=
                    {
                        (e) =>
                        {
                            if(e.target.value=="Assignment / Work") {setType("assignment");}
                            if(e.target.value=="Class Test") {setType("ct");}
                            if(e.target.value=="Semester final") {setType("term");}
                        }
                    }
                    >
                        <option disabled={true}>Select a type</option>
                        <option>Assignment / Work</option>
                        <option>Class Test</option>
                        <option>Semester final</option>
                    </select>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Course</legend>
                    <div className="flex flex-1">
                        <select
                            defaultValue=""
                            className="select w-full"
                            onChange={
                                (e) => 
                                {
                                    const course_id= Number(e.target.value);
                                    setSelectedCourseId(course_id);
                                    fetchMaterials(course_id);
                                }
                            }
                            >
                            <option value="" disabled>Select a course</option>
                            {courses.map((course) => (
                                <option key={course.c_id} value={course.c_id}>
                                {course.c_name}
                                </option>
                            ))}
                        </select>
                        <span className="label text-red-500 ml-4">Required</span>
                    </div> 
                </fieldset>

                <div className="p-4 bg-neutral-950/30 rounded-lg shadow-lg">
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        footer={
                        date
                            ? `Selected: ${date.toLocaleDateString("en-CA")}`
                            : "Pick a day."
                        }
                    />
                </div>

                <select defaultValue="Pick a material : 1" className="select select-primary"
                onChange=
                {(e)=>
                    {
                        setMid1(Number(e.target.value));
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
                <select defaultValue="Pick a material : 2" className="select select-primary"
                onChange=
                {(e)=>
                    {
                        setMid2(Number(e.target.value));
                    }
                }
                >
                    <option disabled={true}>Pick a material : 2</option>
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
                <select defaultValue="Pick a material : 3" className="select select-primary"
                onChange=
                {(e)=>
                    {
                        setMid3(Number(e.target.value));
                    }
                }
                >
                    <option disabled={true}>Pick a material : 3</option>
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
                <select defaultValue="Pick a material : 4" className="select select-primary"
                onChange=
                {(e)=>
                    {
                        setMid4(Number(e.target.value));
                    }
                }
                >
                    <option disabled={true}>Pick a material : 4</option>
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
                <select defaultValue="Pick a material : 5" className="select select-primary"
                onChange=
                {(e)=>
                    {
                        setMid5(Number(e.target.value));
                    }
                }
                >
                    <option disabled={true}>Pick a material : 5</option>
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
                <br/>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>    
                </div>
                
                <div tabIndex={0} className="collapse bg-base-100 text-white/50 border-none border p-2">
                    <div className="collapse-title font-semibold p-0">What are these {'materials'}?</div>
                    <div className="collapse-content text-sm text-white/40">
                        If you{`'`}re scheduling an assignment that is due in a specific date, a class test that{`'`}s going to be taken, or a semester exam, you might want to attach relevant study materials like notes, slides, or books. This helps students prepare better. You can select up to 5 materials from the ones you{`'`}ve previously uploaded.
                        If you don{`'`}t want to attach any materials, just leave the selections as they are.
                        If you haven{`'`}t uploaded any materials yet, you must upload them first.
                    </div>
                </div>
                <div tabIndex={0} className="collapse bg-base-100 text-white/50 border-none border p-2">
                    <div className="collapse-title font-semibold p-0">How do I upload these {'materials'}?</div>
                    <div className="collapse-content text-sm text-white/40">
                        You can upload materials by clicking the floating action button (FAB) on the main page. It{`'`}s the big circular button with a plus sign (+) located at the bottom right corner of the screen. When you click it, a menu will pop up with different options for uploading various types of materials like notes, slides, books, and practice questions. Just select the type of material you want to upload and follow the prompts to complete the upload process.
                    </div>
                </div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Add a short note</legend>
                    <textarea className="textarea h-24 w-full" placeholder='e.g: "Excludes pages 28-34 of slides 1 & 2" '
                    onChange={(e)=>{setShortnote(e.target.value)}}
                    >

                    </textarea>
                    <div className="label">Optional</div>
                </fieldset>
                
                <div className="flex justify-between mt-8">
                    <Link href="/" className="btn btn-dash btn-warning mx-auto">Cancel</Link>
                    <button onClick={handleSubmit} className="btn btn-soft btn-accent mx-auto">Upload</button>
                </div>
            </fieldset>
        </div>
    );
}