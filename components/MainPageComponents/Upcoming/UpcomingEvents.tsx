import UpcomingCards from "./UpcomingCards";
import { ScheduledEvent } from '../../../app/types/scheduled';

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
        <div>
            {scheduled.map((event) => (
                <UpcomingCards key={event.sch_id} event={event} />
            ))}
        </div>
    );
}