'use client';

import { useState , useEffect } from "react";
import { FilterState } from "./Notes";

interface NotesFilterProps {
    filterState: FilterState;
    setFilterState: (state: FilterState) => void;
}

export default function NotesFilter({ filterState, setFilterState }: NotesFilterProps){

    const [courses, setCourses] = useState<Array<string>>([]);
    const [batches, setBatches] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    const coursesSelected = filterState.type === 'course';
    const batchesSelected = filterState.type === 'batch';

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
        const fetchBatches = async () => {
        try {
            const res = await fetch('/api/getBatches', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            });

            const data = await res.json();

            setBatches(data.batches.map((b: { batch: string }) => b.batch));
        } catch (err) {
            console.error('Error fetching batches:', err);
        } finally {
            setLoading(false); // <-- Stop loading once fetch is complete
        }
        };

        fetchBatches();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.toLowerCase().includes(search.toLowerCase())
    );

    const filteredBatches = batches.filter(batch =>
        batch.toLowerCase().includes(search.toLowerCase())
    );



    return(
        <div className={`bg-neutral-900 p-1 rounded-3xl sticky`}>
            <div className="filter">
                <input className="btn btn-xs filter-reset bg-amber-800 py-0 h-fit w-fit my-auto" type="radio" name="metaframeworks" aria-label="All"
                checked={filterState.type === 'all'}
                onChange={()=>{setFilterState({ type: 'all', value: '' });}}/>
                <p className="my-auto text-xs bg-black/0 border-none w-fit p-1 rounded-xl">Filter by</p>
                <input className="btn text-xs bg-cyan-950 w-fit p-1 rounded-xl" type="radio" name="metaframeworks" aria-label="Courses"
                checked={filterState.type === 'course'}
                onChange={()=>{setFilterState({ type: 'course', value: '' });}}/>
                <input className="btn text-xs bg-cyan-950 w-fit p-1 rounded-xl" type="radio" name="metaframeworks" aria-label="Batches"
                checked={filterState.type === 'batch'}
                onChange={()=>{setFilterState({ type: 'batch', value: '' });}}/>
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
            {batchesSelected &&
            <form className="mt-0 overflow-y-auto h-70 md:h-90 lg:h-140 p-2">
                <div className='flex justify-right'>
                    <input type="text" placeholder="Search" className="input input-bordered w-24 h-8 md:w-auto m-2 mb-0" 
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}/>
                    <p className="my-auto text-xs bg-black/0 border-none w-fit p-1 rounded-xl">{filteredBatches.length} batches</p>
                </div>
                <br/>
                <input className="btn btn-xs bg-neutral-600 m-0.5 btn-square text-xs"
                type="button"
                value="×"
                onClick={() => setFilterState({ type: 'all', value: '' })}
                />
                {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
                ) : filteredBatches.length > 0 ? (
                filteredBatches.map((batch, index) => (
                    <input
                    key={index}
                    className="btn btn-sm m-0.5 p-0.5 bg-black/10"
                    type="radio"
                    name="frameworks"
                    aria-label={batch}
                    value={batch}
                    checked={filterState.type === 'batch' && filterState.value === batch}
                    onChange={() => setFilterState({ type: 'batch', value: batch })}
                    />
                ))
                ) : (
                <p className="text-gray-400 text-xs p-2">No batches found</p>
                )}
            </form>}
        </div>
    );
}