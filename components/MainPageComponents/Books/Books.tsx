import BooksFilter from "./BooksFilter";

export default function Notes(){
    return(
        <div className={`grid grid-cols-[5fr_13fr]`}>
            {/*Books filter*/}
            <BooksFilter/>

            {}
        </div>
        

    );
}