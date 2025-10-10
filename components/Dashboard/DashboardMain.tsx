import Contributions from "./Contributions";
import Profile from "./Profile";
import Stats from "./Stats";
import TopContributors from "./TopContributors";

export default function DashboardMain() {
  return (
    <div className="m-2 flex md:flex-row flex-col">
        <div className="flex-1 flex-col m-1 *:m-1">
            <div className="flex-2 border-1 border-neutral-800 rounded-lg md:h-[71dvh] h-fit">
                <Profile />
            </div>
            <div className="flex-1 border-1 border-neutral-800 rounded-lg h-[16dvh]">
                <Stats />
            </div>
        </div>
        <div className="flex-4 border-1 border-neutral-800 rounded-lg m-1">
            <Contributions/>
        </div>
        <div className="flex-1 border-1 border-neutral-800 rounded-lg m-1">
            <TopContributors/>
        </div>
        
    </div>
  );
}