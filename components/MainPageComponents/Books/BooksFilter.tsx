'use client';

import { useState , useEffect } from "react";
import { FilterState } from "./Books";

interface BooksFilterProps {
    filterState: FilterState;
    setFilterState: (state: FilterState) => void;
}

export default function BooksFilter({ filterState, setFilterState }: BooksFilterProps){

    const [courses, setCourses] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    const coursesSelected = filterState.type === 'course';

    useEffect(() => {
        const fetchCourses = async () => {
        try {

            const res = await fetch('https://server-univ-vault.onrender.com/getCourses', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ department: "" }),
            });

            const data = await res.json();

            setCourses(data.courses.map((c: { c_name: string }) => c.c_name));
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.toLowerCase().includes(search.toLowerCase())
    );



    return(
        <div className={`bg-neutral-900 p-2 sm:p-1 rounded-3xl`}>
            <div className="filter flex flex-wrap gap-1">
                <input className="btn btn-xs filter-reset bg-amber-800 py-0 h-fit w-fit my-auto" type="radio" name="metaframeworks" aria-label="All"
                checked={filterState.type === 'all'}
                onChange={()=>{setFilterState({ type: 'all', value: '' });}}/>
                <p className="my-auto text-xs bg-black/0 border-none w-fit p-1 rounded-xl">Filter by</p>
                <input className="btn text-xs bg-cyan-950 w-fit p-1 rounded-xl" type="radio" name="metaframeworks" aria-label="Courses"
                checked={filterState.type === 'course'}
                onChange={()=>{setFilterState({ type: 'course', value: '' });}}/>
            </div>
            
            {coursesSelected &&
            <form className="mt-0 overflow-y-auto h-60 sm:h-70 md:h-90 lg:h-150 p-0">
                <div className='flex flex-wrap sm:flex-nowrap justify-right'>
                    <input type="text" placeholder="Search" className="input input-bordered w-full sm:w-24 h-8 md:w-auto m-2 mb-0" 
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}/>
                    <p className="my-auto text-xs bg-black/0 border-none w-fit p-1 rounded-xl">{filteredCourses.length} courses</p>
                </div>
                <br/>
                <input
                className="btn btn-xs bg-neutral-600 m-0.5 btn-square text-xs"
                type="button"
                value="×"
                onClick={() => setFilterState({ type: 'all', value: '' })}
                />
                {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
                ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                    <input
                    key={index}
                    className="btn btn-sm m-0.5 p-0.5 bg-black/10"
                    type="radio"
                    name="frameworks"
                    aria-label={course}
                    value={course}
                    checked={filterState.type === 'course' && filterState.value === course}
                    onChange={() => setFilterState({ type: 'course', value: course })}
                    />
                ))
                ) : (
                <p className="text-gray-400 text-xs p-2">No courses found</p>
                )}
            </form>}
        </div>
    );
}