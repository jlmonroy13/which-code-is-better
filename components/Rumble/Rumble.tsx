"use client";

import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";
import cx from "classnames";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import CodeSnippet from "../CodeSnippet";
import CommentsSection from "../CommentsSection";
import SideMenu from "../SideMenu";

const orbitron = Orbitron({ subsets: ["latin"] });

const Rumble = () => {
  const { session } = useAuth();
  const { rumble } = useRumble();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  const closeSideMenu = () => {
    setIsSideMenuVisible(false);
  };

  if (!rumble?._id)
    return (
      <div className="max-w-2xl text-2xl mx-auto p-6 text-center h-full flex items-center">
        There is no rumble available for this week. Please try a different week.
      </div>
    );

  const { snippets } = rumble;
  const [snippet1, snippet2] = snippets;
  const userVote = rumble.votes.find(
    ({ userId }) => userId === session?.user?.id
  );
  const hasVotedSnipped1 = userVote?.snippetId === snippet1._id;
  const hasVotedSnipped2 = userVote?.snippetId === snippet2._id;

  return (
    <>
      <div className="min-h-screen bg-base-100 relative">
        <button
          onClick={toggleSideMenu}
          className="flex items-center gap-2 bg-neutral text-neutral-content px-3 py-2 rounded absolute top-4 left-5 z-10 hover:text-white transition-colors shadow-md capitalize"
        >
          <FaBars /> Previous rumbles
        </button>
        <main className="mx-auto pt-20">
          <div className="max-w-2xl px-5 mx-auto">
            <h1
              className={cx(
                "text-4xl font-bold text-center mb-6 text-white",
                orbitron.className
              )}
            >
              Which Code Is Better?
            </h1>
            <div className="text-center text-neutral-300  px-6">
              <span className="underline">
                Click on the code snippet you think is best.
              </span>{" "}
              Feel free to leave a comment explaining your choice.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            {snippet1._id && (
              <CodeSnippet
                id={snippet1._id}
                className="ml-auto"
                code={snippet1.code}
                containerClassName="bg-gradient-to-t from-red-500 to-base-100"
                language={snippet1.language}
                hasVoted={hasVotedSnipped1}
              />
            )}
            {snippet2._id && (
              <CodeSnippet
                id={snippet2._id}
                className="mr-auto"
                code={snippet2.code}
                containerClassName="bg-gradient-to-t from-blue-500 to-base-100"
                language={snippet2.language}
                hasVoted={hasVotedSnipped2}
              />
            )}
            <Image
              src="/vs.png"
              width={70}
              height={70}
              alt="vs"
              className="absolute right-1/2 translate-x-1/2 bottom-1/2 z-20"
            />
          </div>
          <div className="max-w-[1280px] mx-auto p-6">
            <CommentsSection hasVoted={!!userVote} />
          </div>
        </main>
        <SideMenu isVisible={isSideMenuVisible} onClose={closeSideMenu} />
      </div>
    </>
  );
};

export default Rumble;
