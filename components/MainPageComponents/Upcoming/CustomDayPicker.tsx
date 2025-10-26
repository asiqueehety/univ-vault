import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function CustomDayPicker({selectedDate, setSelectedDate}: {selectedDate?: Date, setSelectedDate?: (date: Date | undefined) => void}) {
  function formatCustomDate(date: Date): string {
    const d = new Date(date);
    const weekday = d.toLocaleString("en-US", { weekday: "short" });
    const day = d.toLocaleString("en-US", { day: "2-digit" });
    const month = d.toLocaleString("en-US", { month: "long" });
    const year = d.getFullYear();
    return `${weekday}, ${day} ${month}, ${year}`;
  }

  function isItToday(date:Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate();
  }

  return (
    <div className="p-2 sm:p-4 bg-black/10 rounded-lg shadow-lg h-fit w-full sm:w-fit flex flex-col justify-center">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      <h1 className="card card-lg my-2 mx-auto bg-neutral-900 p-2 text-center text-sm sm:text-base">{selectedDate? isItToday(selectedDate)? "Today":`${formatCustomDate(selectedDate)}` : "Pick a day."}</h1>
    </div>
  );
}