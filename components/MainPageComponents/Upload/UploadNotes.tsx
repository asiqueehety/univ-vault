'use client';

import Link from "next/link";
import {useState , useEffect} from "react";

export default function UploadNotes(){
    const [courses, setCourses] = useState<Array<string>>([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
        try {
            const res = await fetch('/api/getCourses', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const data = await res.json();

            setCourses(data.courses.map((c: { c_name: string }) => c.c_name));
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };
        fetchCourses();
    },[]);

    function uploadedFile(){
        //write code for the file upload here
    }

    async function handleSubmit(){
        if(!title || !description || !selectedCourse || !file){
            alert("Please fill all required fields");
            return;
        }
        
    }
    return(
        <div>
            <fieldset className="fieldset bg-black/20 border-base-300 rounded-box w-xl *:w-xl border p-4 mx-auto my-auto">
                <legend className="fieldset-legend text-3xl">Contribute a Note</legend>
                <label className="label">Title</label>
                <input type="text" className="input" placeholder={`eg: Lecture notes on 'C programming character arrays & strings'`} value={title} onChange={(e)=>{setTitle(e.target.value);}} />

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Course</legend>
                    <div className="flex flex-1">
                        <select defaultValue="Select a course" className="select w-full" onChange={(e) => setSelectedCourse(e.target.value)}>
                            <option disabled={true}>Select a course</option>
                            {
                                courses.map((course, index) => (
                                    <option key={index} value={course}>{course}</option>
                                ))
                            }
                        </select>
                        <span className="label text-red-500 ml-4">Required</span>
                    </div> 
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea onChange={(e)=>{setDescription(e.target.value);}} value={description} className="textarea h-50 w-full" placeholder="Add a little description about the note you're providing. You may add details about the content or context of the note, who the teacher was for this particular course, which particular topics are present or absent in this note."></textarea>
                    <div className="label">Optional</div>
                </fieldset>

                <input type="file" onChange={uploadedFile} className="file-input file-input-sm mt-4" />
                <div className="flex justify-between mt-8">
                    <Link href="/" className="btn btn-dash btn-warning mx-auto">Cancel</Link>
                    <button onClick={handleSubmit} className="btn btn-soft btn-accent mx-auto">Upload</button>
                </div>
            </fieldset>
        </div>
    );
}