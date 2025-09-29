import CustomDayPicker from "./CustomDayPicker"
import UpcomingEvents from "./UpcomingEvents";

export default function Upcoming(){
    return(
        <div className="flex flex-col md:flex-row gap-4">
            <CustomDayPicker/>
            <UpcomingEvents/>
        </div>
    );
}