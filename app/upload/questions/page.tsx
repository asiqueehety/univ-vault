import UploadQuestions from "@/components/MainPageComponents/Upload/UploadQuestions";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function Page() {

  return (
    <PageTransitionWrapper>
        <div>
            <UploadQuestions/>
        </div>  
    </PageTransitionWrapper>
       
  );
}