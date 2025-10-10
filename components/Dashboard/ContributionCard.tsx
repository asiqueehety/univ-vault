'use client';

interface ContributionCardProps {
  m_title: string;
  m_description: string;
  m_type: string;
  con_points: number;
  c_name: string;
  file_location: string;
}

export default function ContributionCard({
  m_title,
  m_description,
  m_type,
  con_points,
  c_name,
  file_location,
}: ContributionCardProps) {
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
