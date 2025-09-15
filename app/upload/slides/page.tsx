import UploadSlides from "@/components/MainPageComponents/Upload/UploadSlides";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function Page() {

  return (
    <PageTransitionWrapper>
        <div>
            <UploadSlides/>
        </div>  
    </PageTransitionWrapper>
       
  );
}