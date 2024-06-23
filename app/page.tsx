import Rumble from "@/components/Rumble";
import { RumbleProvider } from "@/context/rumbleContext";
import { getRumbleByDate } from "@/utils/api/rumble";
import { getCurrentDate } from "@/utils/date";

const Home: React.FC = async () => {
  const todayDate = getCurrentDate();
  const rumble = await getRumbleByDate(todayDate);

  return (
    <RumbleProvider rumble={rumble}>
      <Rumble />
    </RumbleProvider>
  );
};

export default Home;
