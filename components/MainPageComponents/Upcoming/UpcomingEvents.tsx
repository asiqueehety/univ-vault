import UpcomingCards from "./UpcomingCards";

interface ScheduledEvent{
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

type schedProps = {
    scheduled: ScheduledEvent[]
}

export default function UpcomingEvents({scheduled}:schedProps){
    scheduled.sort((a, b) => new Date(a.sch_date).getTime() - new Date(b.sch_date).getTime());
    if(scheduled.length === 0){
        return(
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md w-full h-96">
                <h2 className="text-2xl font-semibold mb-4">No Events Scheduled</h2>
                <p className="text-gray-600">Please select a date to view scheduled events.</p>
            </div>
        );
    }

    return(
        <div className="flex flex-row flex-wrap">
            {scheduled.map((event) => (
                <UpcomingCards key={event.sch_id} event={event} />
            ))}
        </div>
    );
}