
'use client';

import { useEffect, useState } from 'react';
import ContributionCard from './ContributionCard';

interface Contribution {
  m_id: number;
  m_title: string;
  m_description: string;
  m_type: string;
  con_points: number;
  c_name: string;
  file_location: string;
  course_id: string;
}

export default function Contributions() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in or token missing.");
            return;
        }
        const userFetch =await fetch('https://server-univ-vault.onrender.com/getCurrentUser',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const user = await userFetch.json();

        const res = await fetch('https://server-univ-vault.onrender.com/getUserContributions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.user_id }),
        });

        const data = await res.json();
        setContributions(data);
      } catch (err) {
        console.error('Error fetching contributions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchContributions();
  }, []);

  return (
    <div>
        <h1 className="flex justify-center bg-white/10 rounded-xl m-1">Your Contributions</h1>
        <div className='overflow-y-auto h-[83dvh]'>
            
        
            {loading ? (
            <div className="flex justify-center mt-10">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
            ) : contributions.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No contributions found.</p>
            ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contributions.map((contribution) => (
                <ContributionCard key={contribution.m_id} {...contribution} />
                ))}
            </div>
            )}
        </div>

    </div>  );
}
