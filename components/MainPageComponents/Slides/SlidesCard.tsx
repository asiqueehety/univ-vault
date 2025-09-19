
interface SlidesCardProps {
    slide:{
        c_name: string;
        con_points: number;
        course_id: number;
        file_location: string;
        m_description: string;
        m_id: number;
        m_title: string;
        m_type: string;
        provider_id: number;
        t_name: string;
        name: string;
        batch: string;
        dept: string;
        t_designation: string;
        t_dept_name: string;
    }
}

export default function SlidesCard(props : SlidesCardProps)

{
    return(
        <div className="card bg-neutral-800/50 w-80 shadow-sm">
            {/*I wanna show a preview of the document in here. The preview will be its first page*/}
            <div className="card-body">
                <h2 className="card-title mb-6">{props.slide.m_title}</h2>
                <p className="text-xs bg-teal-950 p-2 rounded-xl">{props.slide.m_description}</p>
                <div className="*:m-1 bg-black/10 flex flex-wrap gap-1 rounded-2xl">
                    <div className="w-fit *:ml-1">
                        <div>{props.slide.t_name}</div>
                        <div className=" w-fit text-xs text-white/20">{props.slide.t_designation}</div>
                    </div>
                </div>
                <div className="*:m-1 bg-black/10 flex flex-wrap gap-1 rounded-2xl">
                    <p className="text-xs my-auto">Contributed by</p>
                    <div className="badge w-fit">
                        {props.slide.name}
                        <div className="w-fit p-1 text-white/10">{props.slide.dept}</div>    
                        <div className="w-fit p-1 text-white/10">{props.slide.batch}</div>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-ghost" title="Preview">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-view-icon lucide-view"><path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/><path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/><circle cx="12" cy="12" r="1"/><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/></svg>
                    </button>
                    <button className="btn btn-ghost" title="Download">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}