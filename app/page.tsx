import Rumble from "@/components/Rumble";
import { RumbleProvider } from "@/context/rumbleContext";
import { getRumbleByWeek } from "@/utils/api/rumble";
import { getCurrentWeek } from "@/utils/date";

const Home: React.FC = async () => {
  const currentWeek = getCurrentWeek();
  const rumble = await getRumbleByWeek(currentWeek);

  return (
    <RumbleProvider rumble={rumble}>
      <Rumble />
    </RumbleProvider>
  );
};

export default Home;
