import EditMaterial from "@/components/Dashboard/Edit/EditMaterial";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function Page() {

  return (
    <PageTransitionWrapper>
        <div>
            <EditMaterial/>
        </div>  
    </PageTransitionWrapper>
  );
}