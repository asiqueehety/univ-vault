'use client';

import Link from "next/link";
import {useState , useEffect} from "react";

export default function UploadNotes(){
    const [courses, setCourses] = useState<Array<{ c_id: number; c_name: string }>>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState("");
    const [depts, setDepts] = useState<Array<string>>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [teachers, setTeachers] = useState<Array<{ t_id: number; t_name: string }>>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
    const [batch, setBatch] = useState<number | null>(null);
    useEffect(() => {
        const fetchDepts = async () => {
        try {
            const res = await fetch('https://server-univ-vault.onrender.com/getDepts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const data = await res.json();

            setDepts(data.depts);
        } catch (err) {
            console.error('Error fetching Depts:', err);
        }
    };
        fetchDepts();
    },[]);

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
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };

    const fetchTeachers = async (department : string) => {
        try {
            const res = await fetch('https://server-univ-vault.onrender.com/getTeachers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ department }),
            });
            const data = await res.json();

            setTeachers(data.teachers);
        } catch (err) {
            console.error('Error fetching teachers:', err);
        }
    };

    const uploadedFile = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFile(file);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/upload/files/local', {
            method: 'POST',
            body: formData,
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Upload failed');
            }
            const imageUrl = data.url;

            setFileURL(imageUrl);
            console.log("Image uploaded:", imageUrl);

        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    const handleSubmit = async () => {
        if (!title || !selectedCourseId || !file) {
            return
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

        const provider_id = user.user_id; // Secure, verified user_id
        const q_type = description;
        const course_id = selectedCourseId // Assuming course IDs are 1-based indices
        const q_title = title;

        const dbdata = {
            provider_id:provider_id,
            q_type:q_type,
            course_id:course_id,
            q_title:q_title,
            file_location: fileURL,
            con_points:5,
            selectedTeacherId: selectedTeacherId,
            year: batch
        }

        try {
            const res = await fetch('https://server-univ-vault.onrender.com/upload/question', {
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
        <div className="p-2 sm:p-4">
            <fieldset className="fieldset bg-black/20 border-base-300 rounded-box w-full max-w-xl *:w-full border p-3 sm:p-4 mx-auto my-auto">
                <legend className="fieldset-legend text-xl sm:text-2xl lg:text-3xl">Contribute a Question to practice</legend>
                <label className="label text-sm sm:text-base">Title</label>
                <input type="text" className="input text-sm sm:text-base" placeholder={`eg: Lecture notes on 'C programming character arrays & strings'`} value={title} onChange={(e)=>{setTitle(e.target.value);}} />

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm sm:text-base">Department of the course</legend>
                    <div className="flex-1">
                        <select defaultValue="Select a department" className="select text-sm sm:text-base"
                        onChange={(e) => {
                            const dept = e.target.value;
                            setSelectedDepartment(dept);
                            fetchCourses(dept);
                            fetchTeachers(dept);
                        }}

                        >
                            <option disabled={true}>Select a department</option>
                            {depts.map((dept, index) => (
                                <option key={index} value={dept}>
                                {dept}
                                </option>
                            ))}
                        </select>
                        <span className="label text-red-500 ml-2 sm:ml-5 text-xs sm:text-sm">Required</span>
                    </div>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm sm:text-base">Source</legend>
                    <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-0">
                        <select defaultValue="Questions from:"
                        onChange={(e)=>
                        {
                            if(e.target.value=="Class test") {setDescription("ct");}
                            if(e.target.value=="Semester final") {setDescription("term");}
                            if(e.target.value=="Books / others ...") {setDescription("others");}
                            
                        }} className="select select-neutral text-sm sm:text-base">
                            <option disabled={true}>Questions from:</option>
                            <option>Class test</option>
                            <option>Semester final</option>
                            <option>Books / others ...</option>
                        </select>
                        <div className="label text-red-600 ml-0 sm:ml-5 text-xs sm:text-sm">Required</div>
                    </div>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm sm:text-base">Course</legend>
                    <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-0">
                        <select
                            defaultValue=""
                            className="select w-full text-sm sm:text-base"
                            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                            >
                            <option value="" disabled>Select a course</option>
                            {courses.map((course) => (
                                <option key={course.c_id} value={course.c_id}>
                                {course.c_name}
                                </option>
                            ))}
                        </select>
                        <span className="label text-red-500 ml-0 sm:ml-4 text-xs sm:text-sm">Required</span>
                    </div> 
                </fieldset>
                
                {description && description!="others" &&
                <div>
                    <legend className="fieldset-legend text-sm sm:text-base">Test year</legend>
                    <div className="flex flex-row gap-4 sm:gap-12">
                        <select className="select select-success text-sm sm:text-base w-full sm:w-auto" onChange={(e) => setBatch(Number(e.target.value))}>
                            {Array.from({ length: 2025 - 2001 + 1 }, (_, i) => {
                                const year = 2001 + i;
                                return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                                );
                            })}
                        </select>    
                    </div>  
                </div>
                }
                {description=="ct" &&
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm sm:text-base">Course teacher</legend>
                    <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-0">
                        <select
                            defaultValue=""
                            className="select w-full text-sm sm:text-base"
                            onChange={(e) => setSelectedTeacherId(Number(e.target.value))}
                            >
                            <option value="" disabled>Select the course teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.t_id} value={teacher.t_id}>
                                {teacher.t_name}
                                </option>
                            ))}
                        </select>
                        <span className="label text-red-500 ml-0 sm:ml-4 text-xs sm:text-sm">Required</span>
                    </div> 
                </fieldset>}
                
                

                <input type="file" onChange={uploadedFile} className="file-input file-input-xs sm:file-input-sm mt-4 w-full" />
                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                    <Link href="/" className="btn btn-sm sm:btn-md btn-dash btn-warning mx-auto w-full sm:w-auto">Cancel</Link>
                    <button onClick={handleSubmit} className="btn btn-sm sm:btn-md btn-soft btn-accent mx-auto w-full sm:w-auto">Upload</button>
                </div>
            </fieldset>
        </div>
    );
}