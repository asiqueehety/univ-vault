import Link from "next/link";
import PageTransitionWrapper from "../PageTransitionWrapper";
import Notes from "./Notes/Notes";
import Slides from "./Slides/Slides";
import Books from "./Books/Books";

export default function OpeningPage(){
    return(
        <PageTransitionWrapper>
        <div className="tabs tabs-border justify-center">
            <input type="radio" name="my_tabs_2" className="tab" aria-label="Recommended for you" defaultChecked />
            <div className="tab-content bg-base-100 p-3">Tab content 1</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Notes" />
            <div className="tab-content bg-base-100 p-3">
                <Notes/>
            </div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Slides" />
            <div className="tab-content bg-base-100 p-3">
                <Slides/>
            </div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Books" />
            <div className="tab-content bg-base-100 p-3">
                <Books/>
            </div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Courses" />
            <div className="tab-content bg-base-100 p-3">Tab content 3</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Practice" />
            <div className="tab-content bg-base-100 p-3">Tab content 3</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Upcoming" />
            <div className="tab-content bg-base-100 p-3">Tab content 3</div>

        </div>
            <div className="fab">
                {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
                <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-info">
                    <svg
                        aria-label="New"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="size-6"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>

                {/* close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder */}
                <div className="fab-close">
                    Close <span className="btn btn-circle btn-lg btn-error">✕</span>
                </div>

                {/* buttons that show up when FAB is open */}
                <div>Notes<Link href="/upload/notes/" className="btn btn-lg btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-icon lucide-notebook"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M16 2v20"/></svg>    
                </Link></div>
                <div>Slides<Link href="/upload/slides/" className="btn btn-lg btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallpaper-icon lucide-wallpaper"><path d="M12 17v4"/><path d="M8 21h8"/><path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15"/><circle cx="8" cy="9" r="2"/><rect x="2" y="3" width="20" height="14" rx="2"/></svg>    
                </Link></div>
                <div>Question Papers<Link href="/upload/papers/" className="btn btn-lg btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scroll-text-icon lucide-scroll-text"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>  
                </Link></div>
                <div>Books<Link href="/upload/books/" className="btn btn-lg btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text-icon lucide-book-open-text"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>
                </Link></div>
            </div>
        </PageTransitionWrapper>

    );
}