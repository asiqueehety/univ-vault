'use client'

import {useState , useEffect} from "react";

interface ProfileProps {
    name: string,
    phone: string,
    email: string
    institution: string,
    batch: string,
    dept: string,
    contribution_points: number
}

export default function Profile(){
    const [profile, setProfile] = useState<ProfileProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    window.location.href = '/login';
                    return;
                }
                const userFetch =await fetch('https://server-univ-vault.onrender.com/getCurrentUser',{
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const user = await userFetch.json();
                const response = await fetch('https://server-univ-vault.onrender.com/user/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.user_id }), // Replace with actual user ID
                });
                const data = await response.json();
                setProfile(data.profileData?.[0] || null);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProfile();
    },[]);

    return(
        <div>
            <h1 className="flex justify-center bg-white/10 rounded-xl m-0.5">Your profile</h1>
            <div>
            {
            loading ? (
                <div className="flex justify-center align-items h-full">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div>
                    <div className="m-1 p-2">
                        <div className="divider"> 
                            <h1 className="text-xs flex justify-center mb-0.5 text-white/20">Username</h1>
                        </div>
                        <p className={`bg-black/20 flex justify-center rounded-xl p-1`}>{profile?.name}</p>
                        <div className="divider"> 
                            <h1 className="text-xs flex justify-center my-0.5 text-white/20">Email</h1>
                        </div>
                        <p className="mt-2 flex justify-center"> {profile?.email}</p>
                        <div className="divider"> 
                            <h1 className="text-xs flex justify-center my-0.5 text-white/20">Phone</h1>
                        </div>
                        <p className="mt-2 flex justify-center"> {profile?.phone}</p>
                        <div className="divider"> 
                            <h1 className="text-xs flex justify-center my-0.5 text-white/20">Institution</h1>
                        </div>
                        <p className="mt-2 flex justify-center"> {profile?.institution}</p>
                        <div className="divider"> 
                            <h1 className="text-xs flex justify-center my-0.5 text-white/20">Department</h1>
                        </div>
                        <p className="mt-2 flex justify-center"> {profile?.dept}</p>
                        <div className="divider"> 
                            <h1 className="text-xs flex justify-center my-0.5 text-white/20">Batch</h1>
                        </div>
                        <p className="mt-2 flex justify-center"> {profile?.batch}</p>
                        <div className="divider"> 
                            <h1 className="text-xs flex justify-center my-0.5 text-white/20">Contribution Points</h1>
                        </div>
                        <p className="mt-2 flex justify-center"> {profile?.contribution_points}</p>
                        
                    </div>
                </div>
            )
            }
            </div>
        </div>
        
    );
}