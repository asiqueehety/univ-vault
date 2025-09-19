'use client';

import { useState } from "react";
import NotesFilter from "./NotesFilter";
import NotesMain from "./NotesMain";

export interface FilterState {
  type: 'all' | 'course' | 'batch';
  value: string;
}

export default function Notes(){
    const [filterState, setFilterState] = useState<FilterState>({
        type: 'all',
        value: ''
    });

    return(
        <div className={`grid grid-cols-[4fr_13fr]`}>
            {/*Notes filter*/}
            <NotesFilter filterState={filterState} setFilterState={setFilterState} />
            <NotesMain filterState={filterState} />
        </div>
    );
}