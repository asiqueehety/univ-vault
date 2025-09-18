import NotesCard from "./NotesCard";

export default function NotesMain(){
    interface Note {
    m_id: number;
    provider_id: number;
    m_type: string;
    course_id: number;
    m_title: string;
    m_description: string;
    file_location: string;
    con_points: number;
    c_name: string;
    t_name: string;
    name: string;
    batch: string;
    dept: string;
    t_designation: string;
    t_dept_name: string;
    }

    type GroupedNotes = {
    [courseName: string]: Note[];
    };
    function groupNotesByCourse(notesList: Note[]): GroupedNotes {
        return notesList.reduce((acc: GroupedNotes, note: Note) => {
            if (!acc[note.c_name]) {
            acc[note.c_name] = [];
            }
            acc[note.c_name].push(note);
            return acc;
        }, {});
    }
    const notesList = 
[
  {
    "m_id": 19,
    "provider_id": 1,
    "m_type": "note",
    "course_id": 5,
    "m_title": "Waves and Oscillations + LASER Physics - PHYSICS",
    "m_description": "Full note on Oscillations and LASER Physics by CSE-21\nPHY-1107",
    "file_location": "/assets/files/403c9fe7-a803-4bea-a66b-6f8bac6dec72.pdf",
    "con_points": 10,
    "c_name": "Physics",
    "t_name": "Md. Idris Ali",
    "t_designation": "Assistant Professor",
    "t_dept_name": "PHY",
    "name": "asique",
    "dept": "CSE",
    "batch": "2021"
  },
  {
    "m_id": 20,
    "provider_id": 1,
    "m_type": "note",
    "course_id": 5,
    "m_title": "Quantum Physics - PHYSICS",
    "m_description": "PHY - 1107 notes on Quantum Mechanics taught by Asad Sir",
    "file_location": "/assets/files/b8708eb9-d0dd-4a18-bc72-e2c6e7450866.pdf",
    "con_points": 10,
    "c_name": "Physics",
    "t_name": "Dr. Md. Asaduzzaman",
    "t_designation": "Associate Professor",
    "t_dept_name": "PHY",
    "name": "asique",
    "dept": "CSE",
    "batch": "2021"
  },
  {
    "m_id": 21,
    "provider_id": 1,
    "m_type": "note",
    "course_id": 9,
    "m_title": "Differential Calculus by CSE-21",
    "m_description": "Differential Calculus Notes - Asraful Alom sir by CSE 21",
    "file_location": "/assets/files/a3a91ce5-3240-4a75-926d-6fec3e75b197.pdf",
    "con_points": 10,
    "c_name": "Differential and Integral Calculus",
    "t_name": "Dr. Md. Asraful Alom",
    "t_designation": "Professor",
    "t_dept_name": "MATH",
    "name": "asique",
    "dept": "CSE",
    "batch": "2021"
  },
  {
    "m_id": 22,
    "provider_id": 1,
    "m_type": "note",
    "course_id": 9,
    "m_title": "Integral Calculus - MATH 1107",
    "m_description": "Integral Calculus notes by Dulal Sir;\nFrom CSE 21",
    "file_location": "/assets/files/a6ed76a1-7ded-4007-8d1c-ad0b783e4e03.pdf",
    "con_points": 10,
    "c_name": "Differential and Integral Calculus",
    "t_name": "Md. Dulal Hossain",
    "t_designation": "Assistant Professor",
    "t_dept_name": "MATH",
    "name": "asique",
    "dept": "CSE",
    "batch": "2021"
  },
  {
    "m_id": 23,
    "provider_id": 1,
    "m_type": "note",
    "course_id": 7,
    "m_title": "English Grammar - HUM 1107",
    "m_description": "English Grammar lectures\nfrom CSE 21",
    "file_location": "/assets/files/16953f7c-ef1a-4169-9e6c-2b68d150f2ef.pdf",
    "con_points": 10,
    "c_name": "English and Human Communication",
    "t_name": "Munshi Tauhiduzzaman",
    "t_designation": "Assistant Professor",
    "t_dept_name": "HUM",
    "name": "asique",
    "dept": "CSE",
    "batch": "2021"
  }
]

    const groupedNotes = groupNotesByCourse(notesList);


    return(
        <div className="p-6 overflow-y-auto h-[80vh]">
            {Object.entries(groupedNotes).map(([courseName, notes]) => (
                <div key={courseName} className="mb-6">
                    <h2 className="text-3xl my-3 bg-black/20 rounded-xl p-3">{courseName}</h2>
                    <div className="flex flex-wrap gap-4">
                        {Object.entries(notes).map(([index, note]) => (
                            <NotesCard key={note.m_id} note={note} />
                        ))}
                    </div>
                    <div className="divider"></div>
                    
                </div>
            ))}
        </div>
    );
}