import NotesFilter from "./NotesFilter";
import NotesMain from "./NotesMain";

export default function Notes(){
    return(
        <div className={`grid grid-cols-[4fr_13fr]`}>
            {/*Notes filter*/}
            <NotesFilter/>
            <NotesMain/>
        </div>
        

    );
}