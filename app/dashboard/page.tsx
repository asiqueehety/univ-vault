import DashboardMain from "@/components/Dashboard/DashboardMain";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function Page() {

  return (
    <PageTransitionWrapper>
        <div>
            <DashboardMain/>
        </div>  
    </PageTransitionWrapper>
  );
}