import DashboardMain from "@/components/Dashboard/DashboardMain";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets:["latin"],
  weight:["400"],
});


export default function Page() {

  return (
    <PageTransitionWrapper>
        <div className={`${jost.className}`}>
            <DashboardMain/>
        </div>  
    </PageTransitionWrapper>
  );
}