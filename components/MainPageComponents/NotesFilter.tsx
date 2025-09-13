'use client';

import { useState , useEffect } from "react";


export default function NotesFilter(){

    const [courses, setCourses] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(true); // <-- Track loading state

    useEffect(() => {
        const fetchCourses = async () => {
        try {
            const res = await fetch('/api/notes/getCourses', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            });

            const data = await res.json();

            setCourses(data.courses.map((c: { c_name: string }) => c.c_name));
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false); // <-- Stop loading once fetch is complete
        }
        };

        fetchCourses();
    }, []);
    return(
        <div className={`bg-neutral-900 p-1 rounded-3xl`}>
            <label className='text-xs mb-10 bg-cyan-950 w-full p-2 rounded-xl'>Courses</label>
            <input type="text" placeholder="Search" className="input input-bordered w-24 h-8 md:w-auto m-2" />
            <form className="mt-4">
                <input
                className="btn btn-xs bg-neutral-600 m-0.5 btn-square text-xs"
                type="reset"
                value="×"
                />

                {loading ? (
                <p className="text-gray-400 text-xs p-2">Loading...</p> // <-- Show loading state
                ) : courses.length > 0 ? (
                courses.map((course, index) => (
                    <input
                    key={index}
                    className="btn btn-sm m-0.5 p-0.5 bg-black/10"
                    type="checkbox"
                    name="frameworks"
                    aria-label={course}
                    value={course}
                    />
                ))
                ) : (
                <p className="text-gray-400 text-xs p-2">No courses found</p>
                )}
            </form>
        </div>
        
    );
}