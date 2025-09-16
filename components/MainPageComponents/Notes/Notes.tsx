import NotesFilter from "./NotesFilter";

export default function Notes(){
    return(
        <div className={`grid grid-cols-[5fr_13fr]`}>
            {/*Notes filter*/}
            <NotesFilter/>

            {}
        </div>
        

    );
}