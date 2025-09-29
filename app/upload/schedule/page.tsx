import UploadSchedule from "@/components/MainPageComponents/Upload/UploadSchedule";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function Page() {

  return (
    <PageTransitionWrapper>
        <div>
            <UploadSchedule/>
        </div>  
    </PageTransitionWrapper>
       
  );
}