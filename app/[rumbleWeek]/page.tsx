import Rumble from "@/components/Rumble";
import { RumbleProvider } from "@/context/rumbleContext";
import { getRumbleByWeek } from "@/utils/api/rumble";

interface RumblePageProps {
  params: { rumbleWeek: string };
}

const RumblePage: React.FC<RumblePageProps> = async ({
  params: { rumbleWeek },
}) => {
  const rumble = await getRumbleByWeek(rumbleWeek);

  return (
    <RumbleProvider rumble={rumble}>
      <Rumble />
    </RumbleProvider>
  );
};

export default RumblePage;
