'use client';

import { useEffect, useState } from 'react';

interface Contributor {
    user_id: number;
    name: string;
    contribution_points: number;
}


export default function TopContributors(){
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchContributors() {
            const response = await fetch('https://server-univ-vault.onrender.com/getContributors');
            const data = await response.json();
            setContributors(data.contributors);
        }

        fetchContributors();
        setLoading(false);
    }, []);

    return(
        <div className='overflow-y-auto h-[83dvh]'>
            <h1 className="flex justify-center bg-white/10 rounded-xl m-1">Top Contributors</h1>
            {
            loading ? (
                <div className="flex justify-center align-items h-full">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) :
            contributors.length === 0? (
                <p className="flex justify-center">No contributors found.</p>
            )
            :
            (
                <ul className="space-y-4 p-4">
                    {contributors.map((contributor) => (
                        <li key={contributor.user_id} className="bg-white/10 p-4 rounded-lg shadow-md flex flex-row items-center justify-between">
                            <h2 className="text-xl font-semibold">{contributor.name}</h2>
                            <p className="text-sm text-gray-400 bg-black/40 rounded-2xl border-none w-fit p-2">Points: {contributor.contribution_points}</p>
                        </li>
                    ))}
                </ul>
            )
            }
        </div>
    );
}