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

  return (
    <div className="p-4 bg-black/10 rounded-lg shadow-lg h-fit">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        footer={
          selectedDate? `${formatCustomDate(selectedDate)}` : "Pick a day."
        }
      />
    </div>
  );
}