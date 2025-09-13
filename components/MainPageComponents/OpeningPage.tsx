import PageTransitionWrapper from "../PageTransitionWrapper";
import Notes from "./Notes";

export default function OpeningPage(){
    return(
        <PageTransitionWrapper>
        <div className="tabs tabs-border justify-center">
            <input type="radio" name="my_tabs_2" className="tab" aria-label="Recommended for you" defaultChecked />
            <div className="tab-content bg-base-100 p-10">Tab content 1</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Notes" />
            <div className="tab-content bg-base-100 p-10">
                <Notes/>
            </div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Slides" />
            <div className="tab-content bg-base-100 p-10">Tab content 3</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Courses" />
            <div className="tab-content bg-base-100 p-10">Tab content 3</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Teachers" />
            <div className="tab-content bg-base-100 p-10">Tab content 3</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Practice" />
            <div className="tab-content bg-base-100 p-10">Tab content 3</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Upcoming" />
            <div className="tab-content bg-base-100 p-10">Tab content 3</div>

        </div>  
        </PageTransitionWrapper>

    );
}