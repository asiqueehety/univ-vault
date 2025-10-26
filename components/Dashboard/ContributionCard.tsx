'use client';

import Link from "next/link";
import {useState} from "react";
import EditMaterial from "../Dashboard/Edit/EditMaterial";

interface ContributionCardProps {
  m_id: number;
  m_title: string;
  m_description: string;
  m_type: string;
  con_points: number;
  c_name: string;
  file_location: string;
}

async function deletePost(m_id: number, con_points: number) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Get user first
    const userFetch = await fetch('https://server-univ-vault.onrender.com/getCurrentUser', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const user = await userFetch.json();

    // Now send delete request
    const postdel = await fetch('https://server-univ-vault.onrender.com/deletePost', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        m_id: m_id,
        user_id: user.user_id,
        con_points: con_points,
      }),
    });

    const result = await postdel.json();
    console.log(result);

    if (postdel.ok) {
      console.log("Deleted successfully");
      window.location.reload();
    } else {
      console.error(`Failed: ${result.error}`);
    }

  } catch (err) {
    console.error('Error deleting:', err);
  }
}


export default function ContributionCard({
  m_id,
  m_title,
  m_description,
  m_type,
  con_points,
  c_name,
  file_location,
}: ContributionCardProps) {
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-white/10 backdrop-blur-md">
      <div className="card-body">
        <h2 className={`card-title ${m_type=='slide'?'text-info': m_type=='note'? 'text-warning':'text-success'}`}>{m_title}</h2>
        <p className="text-sm text-gray-400 mb-2">{m_description || 'No description provided.'}</p>

        <div className="flex flex-wrap justify-between items-center text-sm mt-2">
          <span className={`badge ${m_type=='slide'?'badge-info': m_type=='note'? 'badge-warning':'badge-success'} badge-outline`}>{m_type}</span>
          <span className="badge badge-ghost">{c_name}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-success font-semibold flex flex-row p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-plus-icon lucide-badge-plus"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
            <span className="my-auto p-1">{con_points} points</span>
          </span>
          <div>
            <button
            className="btn btn-xs bg-red-600"
            onClick={()=>(document.getElementById('my_modal_delete') as HTMLDialogElement)?.showModal()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
            <dialog id="my_modal_delete" className="modal">
                <div className="modal-box">
                    <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      deletePost(m_id, con_points);
                    }}
                    >
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Confirm delete</legend>
                            <p className="text-md">Are you sure you want to delete this contribution? This action cannot be undone</p>
                        </fieldset>
                        <button className="btn bg-red-600">Delete</button>
                    </form>
                    <p className="py-4 text-xs text-white/20">Press ESC key or click outside to cancel</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
            </dialog>
          </div>
          <div>
            <button
            className="btn btn-xs bg-gray-800"
            onClick={()=>(document.getElementById('my_modal_editMat') as HTMLDialogElement)?.showModal()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
            </button>
            <dialog id="my_modal_editMat" className="modal">
                {!confirmationDialog?
                <div className="modal-box">
                    <form
                    onSubmit={(e) => {
                      e.preventDefault();

                    }}
                    >
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Confirm edit</legend>
                            <p className="text-md">Are you sure you want to edit this material?</p>
                        </fieldset>
                        <button className="btn bg-gray-600"
                        onClick={()=>setConfirmationDialog(true)}
                        >Go to edit</button>
                    </form>
                    <p className="py-4 text-xs text-white/20">Press ESC key or click outside to cancel</p>
                </div>:
                <EditMaterial m_id={m_id} m_title={m_title} m_description={m_description} m_type={m_type} con_points={con_points} c_name={c_name} file_location={file_location}/>
                }
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
            </dialog>
          </div>  
          
          {file_location && (
            <a
              href={file_location}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline btn-primary"
            >
              View File
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
