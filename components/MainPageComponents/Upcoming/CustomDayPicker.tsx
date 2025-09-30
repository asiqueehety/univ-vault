import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function CustomDayPicker({selectedDate, setSelectedDate}: {selectedDate?: Date, setSelectedDate?: (date: Date | undefined) => void}) {

  return (
    <div className="p-4 bg-black/10 rounded-lg shadow-lg">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        footer={
          selectedDate? `Selected: ${selectedDate.toLocaleDateString("en-CA")}` : "Pick a day."
        }
      />
    </div>
  );
}