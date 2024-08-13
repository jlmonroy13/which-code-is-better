"use client";
import cx from "classnames";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { getAllRumbles } from "@/utils/api/rumble";
import { RumbleInterface } from "@/types/rumble";
import { getCurrentWeek } from "@/utils/date";

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

function SideMenu({ isVisible, onClose }: SideMenuProps) {
  const [rumbles, setRumbles] = useState<RumbleInterface[]>([]);
  const [selectedRumble, setSelectedRumble] = useState<string | null>(null);
  const { pathname } = window.location;

  useEffect(() => {
    const fetchRumbles = async () => {
      const fetchedRumbles = await getAllRumbles();
      setRumbles(fetchedRumbles);

      const weekFromUrl = pathname.split('/')[1];
      const currentWeek = getCurrentWeek();

      if (weekFromUrl && fetchedRumbles.some(rumble => rumble.rumbleWeek === weekFromUrl)) {
        setSelectedRumble(weekFromUrl);
      } else {
        const currentWeekRumble = fetchedRumbles.find(rumble => rumble.rumbleWeek === currentWeek);
        if (currentWeekRumble) {
          setSelectedRumble(currentWeekRumble.rumbleWeek);
        } else if (fetchedRumbles.length > 0) {
          setSelectedRumble(fetchedRumbles[0].rumbleWeek);
        }
      }
    };
    fetchRumbles();
  }, [pathname]);

  return (
    <>
      <div
        className={cx(
          "fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-40",
          {
            "opacity-100 pointer-events-auto": isVisible,
            "opacity-0 pointer-events-none": !isVisible,
          }
        )}
        onClick={onClose}
      />
      <div
        className={cx(
          "fixed top-0 left-0 h-full bg-base-200 w-64 transition-all duration-300 ease-in-out transform z-50",
          {
            "translate-x-0": isVisible,
            "-translate-x-full": !isVisible,
          }
        )}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Explore Rumbles</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-base-300"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <ul className="overflow-y-auto max-h-[calc(100vh-64px)]">
          {rumbles.map((rumble) => (
            <li key={rumble.rumbleWeek} className="mb-2 px-4">
              <Link
                href={`/${rumble.rumbleWeek}`}
                className={cx("block p-2 rounded", {
                  "bg-primary text-neutral": selectedRumble === rumble.rumbleWeek,
                  "hover:bg-base-300": selectedRumble !== rumble.rumbleWeek,
                })}
                onClick={() => setSelectedRumble(rumble.rumbleWeek)}
              >
                {rumble.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideMenu;
