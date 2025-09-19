'use client'

import SlidesCard from "./SlidesCard";
import { useEffect, useState } from "react";
import { FilterState } from "./Slides";

interface SlidesMainProps {
  filterState: FilterState;
}

export default function SlidesMain({ filterState }: SlidesMainProps) {
  interface Slide {
    m_id: number;
    provider_id: number;
    m_type: string;
    course_id: number;
    m_title: string;
    m_description: string;
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

  const [slidesList, setSlidesList] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const groupSlidesByCourse = (slides: Slide[]) =>
    slides.reduce<Record<string, Slide[]>>((acc, slide) => {
      if (!acc[slide.c_name]) acc[slide.c_name] = [];
      acc[slide.c_name].push(slide);
      return acc;
    }, {});

  const getFilteredSlides = (slides: Slide[]): Slide[] => {
    if (filterState.type === 'all' || !filterState.value) {
      return slides;
    }
    
    if (filterState.type === 'course') {
      return slides.filter(slide => slide.c_name === filterState.value);
    }
    
    if (filterState.type === 'teacher') {
      return slides.filter(slide => slide.t_name === filterState.value);
    }
    
    return slides;
  };

  useEffect(() => {
    async function fetchSlides() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching slides from API...');
        const res = await fetch('/api/getSlides', {
          method: 'POST', // matches backend
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);

        if (!res.ok) {
          const text = await res.text(); // debug HTML responses
          console.error('Failed to fetch slides:', text);
          setError(`Failed to fetch slides: ${res.status} ${res.statusText}`);
          return;
        }

        const data: Slide[] = await res.json();
        
        if (!Array.isArray(data)) {
          console.error('Data is not an array:', data);
          setError('Invalid data format received from server');
          return;
        }
        
        setSlidesList(data);
      } catch (err) {
        console.error('Error fetching slides:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  const filteredSlides = getFilteredSlides(slidesList);
  const groupedSlides = groupSlidesByCourse(filteredSlides);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-[80vh]">
        <div className="text-xl">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center h-[80vh]">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (slidesList.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center h-[80vh]">
        <div className="text-xl text-white/20">No slides found</div>
      </div>
    );
  }

  if (filteredSlides.length === 0 && filterState.type !== 'all') {
    return (
      <div className="p-6 flex items-center justify-center h-[80vh]">
        <div className="text-xl text-white/20">No slides found</div>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto h-[80vh]">
      {Object.entries(groupedSlides).map(([courseName, slides]) => (
        <div key={courseName} className="mb-6">
          <h2 className="text-3xl my-3 bg-black/20 rounded-xl p-3">{courseName}</h2>
          <div className="flex flex-wrap gap-4">
            {slides.map((slide) => (
              <SlidesCard key={slide.m_id} slide={slide} />
            ))}
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
}
