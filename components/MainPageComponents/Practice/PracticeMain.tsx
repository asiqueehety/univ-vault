'use client'

import PracticeCard from "./PracticeCard";
import { useEffect, useState } from "react";
import { FilterState } from "./Practice";

interface PracticeMainProps {
  filterState: FilterState;
}

export default function PracticeMain({ filterState }: PracticeMainProps) {
  interface Prac {
    q_id: number;
    provider_id: number;
    q_type: string;
    course_id: number;
    q_title: string;
    year: number;
    file_location: string;
    con_points: number;
    c_name: string;
    t_name: string;
    name: string;
    batch: string;
    dept: string;
    t_designation: string;
    t_dept_name: string;
  }

  const [practiceList, setPracticeList] = useState<Prac[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const groupPracticeByCourse = (practice: Prac[]) =>
    practice.reduce<Record<string, Prac[]>>((acc, prac) => {
      if (!acc[prac.c_name]) acc[prac.c_name] = [];
      acc[prac.c_name].push(prac);
      return acc;
    }, {});

  const getFilteredPractice = (practice: Prac[]): Prac[] => {
    if (filterState.type === 'all' || !filterState.value) {
      return practice;
    }
    
    if (filterState.type === 'course') {
      return practice.filter(prac => prac.c_name === filterState.value);
    }
    
    if (filterState.type === 'batch') {
      return practice.filter(prac => prac.batch === filterState.value);
    }
    
    return practice;
  };

  useEffect(() => {
    async function fetchPractice() {
      try {
        setLoading(true);
        setError(null);
    
        const res = await fetch('https://server-univ-vault.onrender.com/getPractice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);

        if (!res.ok) {
          const text = await res.text();
          console.error('Failed to fetch practice:', text);
          setError(`Failed to fetch practice: ${res.status} ${res.statusText}`);
          return;
        }

        const data: Prac[] = await res.json();
        
        if (!Array.isArray(data)) {
          setError('Invalid data format received from server');
          return;
        }
        
        setPracticeList(data);
      } catch (err) {
        console.error('Error fetching practice:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPractice();
  }, []);

  // Apply filtering to the practice list
  const filteredPractice = getFilteredPractice(practiceList);
  const groupedPractice = groupPracticeByCourse(filteredPractice);

  if (loading) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 flex items-center justify-center h-[80vh]">
        <div className="text-xl">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 flex items-center justify-center h-[80vh]">
        <div className="text-sm sm:text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (practiceList.length === 0) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 flex items-center justify-center h-[80vh]">
        <div className="text-sm sm:text-xl">No practice found</div>
      </div>
    );
  }

  if (filteredPractice.length === 0 && filterState.type !== 'all') {
    return (
      <div className="p-2 sm:p-4 lg:p-6 flex items-center justify-center h-[80vh]">
        <div className="text-sm sm:text-xl text-white/20">No practice found</div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 lg:p-6 overflow-y-auto h-auto sm:h-[80vh]">
      {Object.entries(groupedPractice).map(([courseName, practice]) => (
        <div key={courseName} className="mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl my-3 bg-black/20 rounded-xl p-2 sm:p-3">{courseName}</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
            {practice.map((prac) => (
              <PracticeCard key={prac.q_id} prac={prac} />
            ))}
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
}
