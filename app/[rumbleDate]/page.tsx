import Rumble from "@/components/Rumble";
import { RumbleProvider } from "@/context/rumbleContext";
import { getRumbleByDate } from "@/utils/api/rumble";

interface RumblePageProps {
  params: { rumbleDate: string };
}

const RumblePage: React.FC<RumblePageProps> = async ({
  params: { rumbleDate },
}) => {
  const rumble = await getRumbleByDate(rumbleDate);

  return (
    <RumbleProvider rumble={rumble}>
      <Rumble />
    </RumbleProvider>
  );
};

export default RumblePage;
