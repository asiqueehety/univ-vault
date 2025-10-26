'use client'

import BooksCard from "./BooksCard";
import { useEffect, useState } from "react";
import { FilterState } from "./Books";

interface BooksMainProps {
  filterState: FilterState;
}

export default function BooksMain({ filterState }: BooksMainProps) {
  interface Book {
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

  const [booksList, setBooksList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const groupBooksByCourse = (books: Book[]) =>
    books.reduce<Record<string, Book[]>>((acc, book) => {
      if (!acc[book.c_name]) acc[book.c_name] = [];
      acc[book.c_name].push(book);
      return acc;
    }, {});

  // Filter books based on the current filter state
  const getFilteredBooks = (books: Book[]): Book[] => {
    if (filterState.type === 'all' || !filterState.value) {
      return books;
    }
    
    if (filterState.type === 'course') {
      return books.filter(book => book.c_name === filterState.value);
    }
    
    return books;
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching books from API...');
        const res = await fetch('https://server-univ-vault.onrender.com/getBooks', {
          method: 'POST', // matches backend
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);

        if (!res.ok) {
          const text = await res.text(); // debug HTML responses
          console.error('Failed to fetch books:', text);
          setError(`Failed to fetch books: ${res.status} ${res.statusText}`);
          return;
        }

        const data: Book[] = await res.json();
        
        if (!Array.isArray(data)) {
          console.error('Data is not an array:', data);
          setError('Invalid data format received from server');
          return;
        }
        
        setBooksList(data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // Apply filtering to the books list
  const filteredBooks = getFilteredBooks(booksList);
  const groupedBooks = groupBooksByCourse(filteredBooks);

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

  if (booksList.length === 0) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 flex items-center justify-center h-[80vh]">
        <div className="text-sm sm:text-xl text-white/20">No books found</div>
      </div>
    );
  }

  if (filteredBooks.length === 0 && filterState.type !== 'all') {
    return (
      <div className="p-2 sm:p-4 lg:p-6 flex items-center justify-center h-[80vh]">
        <div className="text-sm sm:text-xl text-white/20">No books found</div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 lg:p-6 overflow-y-auto h-auto sm:h-[80vh]">
      {Object.entries(groupedBooks).map(([courseName, books]) => (
        <div key={courseName} className="mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl my-3 bg-black/20 rounded-xl p-2 sm:p-3">{courseName}</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
            {books.map((book) => (
              <BooksCard key={book.m_id} book={book} />
            ))}
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
}
