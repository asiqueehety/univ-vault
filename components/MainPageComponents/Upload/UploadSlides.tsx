'use client';

import Link from "next/link";
import {useState , useEffect} from "react";

export default function UploadSlides(){
    const [courses, setCourses] = useState<Array<{ c_id: number; c_name: string }>>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState("");

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

            setCourses(data.courses);
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };
        fetchCourses();
    },[]);

    const uploadedFile = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFile(file);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload/files/local', {
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
            alert("Please fill in all required fields and upload a file.");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in or token missing.");
            return;
        }
        // Get user securely from Supabase
        const res = await fetch('/api/getCurrentUser',
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

        const provider_id = user.user_id;
        const m_type = "slide";
        const course_id = selectedCourseId
        const m_title = title;

        const dbdata = {
            provider_id:provider_id,
            m_type:m_type,
            course_id:course_id,
            m_title:m_title,
            m_description: description,
            file_location: fileURL,
            con_points:4,
        }

        try {
            const res = await fetch('/api/upload/materials', {
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
        <div>
            <fieldset className="fieldset bg-black/20 border-base-300 rounded-box w-xl *:w-xl border p-4 mx-auto my-auto">
                <legend className="fieldset-legend text-3xl">Contribute a Slide</legend>
                <label className="label">Title</label>
                <input type="text" className="input" placeholder={`eg: Lecture slides on 'C programming character arrays & strings'`} value={title} onChange={(e)=>{setTitle(e.target.value);}} />

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Course</legend>
                    <div className="flex flex-1">
                        <select
                            defaultValue=""
                            className="select w-full"
                            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
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
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea onChange={(e)=>{setDescription(e.target.value);}} value={description} className="textarea h-50 w-full" placeholder="Add a little description about the slide you're providing. You may add details about the content or context of the slide, who the teacher was for this particular course, which particular topics are present or absent in this slide."></textarea>
                    <div className="label text-red-600">Required</div>
                </fieldset>

                <input type="file" onChange={uploadedFile} className="file-input file-input-sm mt-4" 
                accept=".pdf,.ppt,.pptx,.key,.odp"
                />
                <div className="flex justify-between mt-8">
                    <Link href="/" className="btn btn-dash btn-warning mx-auto">Cancel</Link>
                    <button onClick={handleSubmit} className="btn btn-soft btn-accent mx-auto">Upload</button>
                </div>
            </fieldset>
        </div>
    );
}