"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-40`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full bg-base-200 w-64 transition-all duration-300 ease-in-out transform ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Explore Rumbles</h2>
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
                className={`block p-2 rounded ${
                  selectedWeek === week
                    ? "bg-primary text-white"
                    : "hover:bg-base-300"
                }`}
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
