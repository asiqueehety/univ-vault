'use client'

import NotesCard from "./NotesCard";
import { useEffect, useState } from "react";
import { FilterState } from "./Notes";

interface NotesMainProps {
  filterState: FilterState;
}

export default function NotesMain({ filterState }: NotesMainProps) {
  interface Note {
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

  const [notesList, setNotesList] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const groupNotesByCourse = (notes: Note[]) =>
    notes.reduce<Record<string, Note[]>>((acc, note) => {
      if (!acc[note.c_name]) acc[note.c_name] = [];
      acc[note.c_name].push(note);
      return acc;
    }, {});

  const getFilteredNotes = (notes: Note[]): Note[] => {
    if (filterState.type === 'all' || !filterState.value) {
      return notes;
    }
    
    if (filterState.type === 'course') {
      return notes.filter(note => note.c_name === filterState.value);
    }
    
    if (filterState.type === 'batch') {
      return notes.filter(note => note.batch === filterState.value);
    }
    
    return notes;
  };

  useEffect(() => {
    async function fetchNotes() {
      try {
        setLoading(true);
        setError(null);
    
        const res = await fetch('https://server-univ-vault.onrender.com/getNotes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);

        if (!res.ok) {
          const text = await res.text();
          console.error('Failed to fetch notes:', text);
          setError(`Failed to fetch notes: ${res.status} ${res.statusText}`);
          return;
        }

        const data: Note[] = await res.json();
        
        if (!Array.isArray(data)) {
          setError('Invalid data format received from server');
          return;
        }
        
        setNotesList(data);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  // Apply filtering to the notes list
  const filteredNotes = getFilteredNotes(notesList);
  const groupedNotes = groupNotesByCourse(filteredNotes);

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

  if (notesList.length === 0) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 flex items-center justify-center h-[80vh]">
        <div className="text-sm sm:text-xl">No notes found</div>
      </div>
    );
  }

  if (filteredNotes.length === 0 && filterState.type !== 'all') {
    return (
      <div className="p-2 sm:p-4 lg:p-6 flex items-center justify-center h-[80vh]">
        <div className="text-sm sm:text-xl text-white/20">No notes found</div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 lg:p-6 overflow-y-auto h-auto sm:h-[80vh]">
      {Object.entries(groupedNotes).map(([courseName, notes]) => (
        <div key={courseName} className="mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl my-3 bg-black/20 rounded-xl p-2 sm:p-3">{courseName}</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
            {notes.map((note) => (
              <NotesCard key={note.m_id} note={note} />
            ))}
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
}
