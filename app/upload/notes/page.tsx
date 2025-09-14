import UploadNotes from "@/components/MainPageComponents/Upload/UploadNotes";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function Page() {

  return (
    <PageTransitionWrapper>
        <div>
            <UploadNotes/>
        </div>  
    </PageTransitionWrapper>
       
  );
}