"use client";

import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";
import cx from "classnames";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import { useMemo, useState } from "react";
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

  const rumbleWinner = useMemo(() => {
    if (!rumble) return;

    const { votes, snippets } = rumble;
    const voteCounts = votes.reduce(
      (counts, { snippetId }) => {
        if (snippetId === snippets[0]._id) counts[0]++;
        if (snippetId === snippets[1]._id) counts[1]++;
        return counts;
      },
      [0, 0]
    );

    const [snippet1Votes, snippet2Votes] = voteCounts;

    if (snippet1Votes > snippet2Votes) return snippets[0]._id;
    if (snippet2Votes > snippet1Votes) return snippets[1]._id;
  }, [rumble]);

  if (!rumble?._id)
    return (
      <div className="max-w-2xl text-2xl mx-auto p-6 text-center h-full flex items-center">
        There is no rumble available for this week. Please try a different week.
      </div>
    );

  const { snippets, title } = rumble;
  const [snippet1, snippet2] = snippets;
  const userVote = rumble.votes.find(
    ({ userId }) => userId === session?.user?.id
  );
  const hasVotedSnipped1 = userVote?.snippetId === snippet1._id;
  const hasVotedSnipped2 = userVote?.snippetId === snippet2._id;

  return (
    <>
      <div className="min-h-screen bg-base-100 relative w-full">
        <button
          onClick={toggleSideMenu}
          className="flex items-center gap-2 bg-neutral text-neutral-content px-3 py-2 rounded absolute top-4 left-5 z-10 hover:text-white transition-colors shadow-md capitalize"
        >
          <FaBars /> Previous rumbles
        </button>
        <div className="mx-auto pt-20">
          <div className="max-w-2xl px-5 mx-auto">
            <h1
              className={cx(
                "text-4xl font-bold text-center mb-6 text-white",
                orbitron.className
              )}
            >
              Which Code Is Better?
            </h1>
            {title && (
              <h2 className="text-2xl font-semibold text-center mb-4 text-neutral-200">
                {title}
              </h2>
            )}
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
                className="ml-auto"
                code={snippet1.code}
                containerClassName="bg-gradient-to-t from-red-500 to-base-100"
                hasVoted={hasVotedSnipped1}
                id={snippet1._id}
                language={snippet1.language}
                rumbleWinner={rumbleWinner}
              />
            )}
            {snippet2._id && (
              <CodeSnippet
                className="mr-auto"
                code={snippet2.code}
                containerClassName="bg-gradient-to-t from-blue-500 to-base-100"
                hasVoted={hasVotedSnipped2}
                id={snippet2._id}
                language={snippet2.language}
                rumbleWinner={rumbleWinner}
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
        </div>
        <SideMenu isVisible={isSideMenuVisible} onClose={closeSideMenu} />
      </div>
    </>
  );
};

export default Rumble;
