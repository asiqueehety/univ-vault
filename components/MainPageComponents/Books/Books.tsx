'use client';

import { useState } from "react";
import BooksFilter from "./BooksFilter";
import BooksMain from "./BooksMain";

export interface FilterState {
  type: 'all' | 'course';
  value: string;
}

export default function Books(){
    const [filterState, setFilterState] = useState<FilterState>({
        type: 'all',
        value: ''
    });

    return(
        <div className={`grid grid-cols-[4fr_13fr]`}>
            {/*Books filter*/}
            <BooksFilter filterState={filterState} setFilterState={setFilterState} />
            <BooksMain filterState={filterState} />
        </div>
    );
}