import UploadBooks from "@/components/MainPageComponents/Upload/UploadBooks";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function Page() {

  return (
    <PageTransitionWrapper>
        <div>
            <UploadBooks/>
        </div>  
    </PageTransitionWrapper>
  );
}