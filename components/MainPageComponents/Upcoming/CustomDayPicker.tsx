'use client'
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function CustomDayPicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="p-4 bg-black/10 rounded-lg shadow-lg">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={
          selected
            ? `Selected: ${selected.toLocaleDateString("en-CA")}`
            : "Pick a day."
        }
      />
    </div>
  );
}
