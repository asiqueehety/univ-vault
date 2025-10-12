'use client';

import { useState } from "react";
import PracticeFilter from "./PracticeFilter";
import PracticeMain from "./PracticeMain";

export interface FilterState {
  type: 'all' | 'course' | 'batch';
  value: string;
}

export default function Practice(){
    const [filterState, setFilterState] = useState<FilterState>({
        type: 'all',
        value: ''
    });

    return(
        <div className={`grid grid-cols-[4fr_13fr]`}>
            {/*Practice filter*/}
            <PracticeFilter filterState={filterState} setFilterState={setFilterState} />
            <PracticeMain filterState={filterState} />
        </div>
    );
}