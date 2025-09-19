'use client';

import { useState } from "react";
import SlidesFilter from "./SlidesFilter";
import SlidesMain from "./SlidesMain";

export interface FilterState {
  type: 'all' | 'course' | 'teacher';
  value: string;
}

export default function Slides(){
    const [filterState, setFilterState] = useState<FilterState>({
        type: 'all',
        value: ''
    });

    return(
        <div className={`grid grid-cols-[4fr_13fr]`}>
            {/*Slides filter*/}
            <SlidesFilter filterState={filterState} setFilterState={setFilterState} />
            <SlidesMain filterState={filterState} />
        </div>
    );
}