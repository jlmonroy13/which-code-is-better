"use client";
import cx from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import useSWR from "swr";

import { RumbleInterface } from "@/types/rumble";
import { BASE_API_URL } from "@/utils/api/rumble";
import { getCurrentWeek } from "@/utils/date";

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SideMenu({ isVisible, onClose }: SideMenuProps) {
  const [rumbles, setRumbles] = useState<RumbleInterface[]>([]);
  const [selectedRumble, setSelectedRumble] = useState<string | null>(null);
  const pathname = usePathname();
  const { data, error, isLoading } = useSWR<RumbleInterface[]>(
    `${BASE_API_URL}/api/rumble?filter=presentAndPast`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      const sortedRumbles = data.sort((a, b) =>
        b.rumbleWeek.localeCompare(a.rumbleWeek),
      );
      setRumbles(sortedRumbles);

      const weekFromUrl = pathname.split("/")[1];
      const currentWeek = getCurrentWeek();

      if (
        weekFromUrl &&
        sortedRumbles.some((rumble) => rumble.rumbleWeek === weekFromUrl)
      ) {
        setSelectedRumble(weekFromUrl);
      } else {
        const currentWeekRumble = sortedRumbles.find(
          (rumble) => rumble.rumbleWeek === currentWeek,
        );
        if (currentWeekRumble) {
          setSelectedRumble(currentWeekRumble.rumbleWeek);
        } else if (sortedRumbles.length > 0) {
          setSelectedRumble(sortedRumbles[0].rumbleWeek);
        }
      }
    }
  }, [pathname, data]);

  if (isLoading) {
    return null;
  }

  if (error) {
    console.error("Error fetching rumbles:", error);
    return null;
  }

  return (
    <>
      <div
        className={cx(
          "fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-40",
          {
            "opacity-100 pointer-events-auto": isVisible,
            "opacity-0 pointer-events-none": !isVisible,
          },
        )}
        onClick={onClose}
      />
      <div
        className={cx(
          "fixed top-0 left-0 h-full bg-base-200 w-80 transition-all duration-300 ease-in-out transform z-50",
          {
            "translate-x-0": isVisible,
            "-translate-x-full": !isVisible,
          },
        )}
      >
        <div className="flex justify-between items-center py-4 pl-4 pr-2">
          <h1 className="text-lg font-bold">Explore Rumbles</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-base-300"
          >
            <FaChevronLeft size={16} />
          </button>
        </div>
        <ul className="overflow-y-auto max-h-[calc(100vh-64px)]">
          {rumbles.map((rumble) => (
            <li key={rumble.rumbleWeek} className="mb-2 px-4">
              <Link
                href={`/${rumble.rumbleWeek}`}
                className={cx("block p-2 rounded", {
                  "bg-primary text-neutral":
                    selectedRumble === rumble.rumbleWeek,
                  "hover:bg-base-300": selectedRumble !== rumble.rumbleWeek,
                })}
                onClick={() => setSelectedRumble(rumble.rumbleWeek)}
              >
                {rumble.rumbleWeek.split("-")[1].slice(1)} - {rumble.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideMenu;
