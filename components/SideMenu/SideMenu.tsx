"use client";
import cx from "classnames";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

function SideMenu({ isVisible, onClose }: SideMenuProps) {
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const weeks = generateWeeks();

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
          {weeks.map((week) => (
            <li key={week} className="mb-2 px-4">
              <Link
                href={`/${week}`}
                className={cx("block p-2 rounded", {
                  "bg-primary text-neutral": selectedWeek === week,
                  "hover:bg-base-300": selectedWeek !== week,
                })}
                onClick={() => setSelectedWeek(week)}
              >
                Week {week}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideMenu;

function getCurrentWeek() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

function generateWeeks() {
  const currentWeek = getCurrentWeek();
  return Array.from({ length: currentWeek }, (_, i) => currentWeek - i);
}
