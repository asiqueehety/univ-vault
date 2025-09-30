interface Scheduled{
    sch_id:number,
    sch_type:string,
    sch_date:Date,
    sch_course:
    {
        c_id:number,
        c_name:string,
        c_dept:string
    },
    sch_batch:string,
    sch_materials:
    {
        m_id:number,
        provider_id:number,
        m_type:string,
        course_id:number,
        m_title:string,
        m_description:string,
        file_location:string,
        con_points:number
    }[],
    sch_dept_name:string,
    sch_shortnote:string
}

interface schedProps{
    event: Scheduled
}

export default function UpcomingCards({event}:schedProps){
    return(
        <div>
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title">{event.sch_type} - {new Date(event.sch_date).toLocaleDateString("en-CA")}</h2>
                    <p></p>
                    <div className="card-actions justify-end">
                        <button className="btn">Prepare</button>
                    </div>
                </div>
            </div>
        </div>
    );
}