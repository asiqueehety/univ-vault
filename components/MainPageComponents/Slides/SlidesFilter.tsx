'use client';

import { useState , useEffect } from "react";
import { FilterState } from "./Slides";

interface SlidesFilterProps {
    filterState: FilterState;
    setFilterState: (state: FilterState) => void;
}

export default function SlidesFilter({ filterState, setFilterState }: SlidesFilterProps){

    const [courses, setCourses] = useState<Array<string>>([]);
    const [teachers, setTeachers] = useState<Array<{t_name: string; t_dept_name: string; t_designation: string}>>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    const coursesSelected = filterState.type === 'course';
    const teachersSelected = filterState.type === 'teacher';

    useEffect(() => {
        const fetchCourses = async () => {
        try {

            const res = await fetch('/api/getCourses', {
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

    useEffect(() => {
        const fetchTeachers = async () => {
        try {
            const res = await fetch('/api/getTeachers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ department: "" }),
            });

            const data = await res.json();

            setTeachers(data.teachers.map((t: { t_name: string; t_dept_name: string; t_designation: string }) => ({
                t_name: t.t_name,
                t_dept_name: t.t_dept_name,
                t_designation: t.t_designation
            })));

        } catch (err) {
            console.error('Error fetching teachers:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchTeachers();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.toLowerCase().includes(search.toLowerCase())
    );

    const filteredTeachers = teachers.filter(teacher =>
        teacher.t_name.toLowerCase().includes(search.toLowerCase())
    );



    return(
        <div className={`bg-neutral-900 p-1 rounded-3xl`}>
            <div className="filter">
                <input className="btn btn-xs filter-reset bg-amber-800 py-0 h-fit w-fit my-auto" type="radio" name="metaframeworks" aria-label="All"
                checked={filterState.type === 'all'}
                onChange={()=>{setFilterState({ type: 'all', value: '' });}}/>
                <p className="my-auto text-xs bg-black/0 border-none w-fit p-1 rounded-xl">Filter by</p>
                <input className="btn text-xs bg-cyan-950 w-fit p-1 rounded-xl" type="radio" name="metaframeworks" aria-label="Courses"
                checked={filterState.type === 'course'}
                onChange={()=>{setFilterState({ type: 'course', value: '' });}}/>
                <input className="btn text-xs bg-cyan-950 w-fit p-1 rounded-xl" type="radio" name="metaframeworks" aria-label="Teachers"
                checked={filterState.type === 'teacher'}
                onChange={()=>{setFilterState({ type: 'teacher', value: '' });}}/>
            </div>
            
            {coursesSelected &&
            <form className="mt-0 overflow-y-auto h-70 md:h-90 lg:h-150 p-0">
                <div className='flex justify-right'>
                    <input type="text" placeholder="Search" className="input input-bordered w-24 h-8 md:w-auto m-2 mb-0" 
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
            {teachersSelected &&
            <form className="mt-0 overflow-y-auto h-70 md:h-90 lg:h-140 p-2">
                <div className='flex justify-right'>
                    <input type="text" placeholder="Search" className="input input-bordered w-24 h-8 md:w-auto m-2 mb-0" 
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}/>
                    <p className="my-auto text-xs bg-black/0 border-none w-fit p-1 rounded-xl">{filteredTeachers.length} teachers</p>
                </div>
                <br/>
                <input className="btn btn-xs bg-neutral-600 m-0.5 btn-square text-xs"
                type="button"
                value="×"
                onClick={() => setFilterState({ type: 'all', value: '' })}
                />
                {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
                ) : filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher, index) => (
                    <div key={index}>
                    <input
                    className="btn btn-sm m-0.5 p-0.5 bg-black/10"
                    type="radio"
                    name="frameworks"
                    aria-label={teacher.t_name}
                    value={teacher.t_name}
                    checked={filterState.type === 'teacher' && filterState.value === teacher.t_name}
                    onChange={() => setFilterState({ type: 'teacher', value: teacher.t_name })}
                    />
                    <span className="text-gray-400 text-xs"> {teacher.t_dept_name}</span>
                    <span className="text-gray-700 text-xs"> {teacher.t_designation}</span>
                    
                    </div>
                ))
                ) : (
                <p className="text-gray-400 text-xs p-2">No teachers found</p>
                )}
            </form>}
        </div>
    );
}