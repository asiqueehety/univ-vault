'use client'
import CustomDayPicker from "./CustomDayPicker"
import UpcomingEvents from "./UpcomingEvents";
import { useEffect } from "react";
import { useState } from "react";

export default function Upcoming(){
    const today = new Date();
    today.setHours(0,0,0,0); // Set to start of the day
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [sched, setSched] = useState
    <{
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
    }[]>([]);

    useEffect(() => {
        if (!selectedDate) return;
        const dateStr = selectedDate.toISOString().split("T")[0];
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) {
            console.log("Invalid date!");
            return;
        }
        d.setDate(d.getDate() + 1);
        const fetchScheduled = async (date : Date) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("User not logged in or token missing.");
                return;
            }
            // Get user securely from Supabase
            const res1 = await fetch('/api/getCurrentUser',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },   
            });
            const user = await res1.json();

            if (!user?.user_id) {
                alert("User not logged in.");
                return;
            }

            const dept = user.dept;
            const batch = user.batch;

            const res = await fetch('/api/getUpcomingMaterials', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sch_date:date , sch_dept: dept, sch_batch: batch}),
            });
            const data = await res.json();

            setSched(data.scheduled);
            }catch (err)
            {
                console.error('Error fetching scheduled events:', err);
            }
        };
        fetchScheduled(d);
    }, [selectedDate]);

    return(
        <div className="flex flex-col md:flex-row gap-4">
            <CustomDayPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <UpcomingEvents scheduled={sched}/>
        </div>
    );
}