"use client";

import cx from "classnames";
import { Orbitron } from "next/font/google"
import Image from "next/image";
import CodeSnippet from "../components/CodeSnippet";
import CommentsSection from "../components/CommentsSection";
import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";

const orbitron = Orbitron({ subsets: ["latin"] });

const Home: React.FC = () => {
  const { session } = useAuth();
  const { rumble } = useRumble();

  if (!rumble?._id) return null;
  const { snippets } = rumble;
  const [snippet1, snippet2] = snippets;
  const userVote = rumble.votes.find(({ userId }) => userId === session?.user?.id);
  const hasVotedSnipped1 = userVote?.snippetId === snippet1._id;
  const hasVotedSnipped2 = userVote?.snippetId === snippet2._id;

  return (
    <div className="min-h-screen bg-base-100">
      <main className="mx-auto">
        <h1
          className={cx(
            "text-4xl font-bold text-center mb-6 text-white pt-10",
            orbitron.className
          )}
        >
          Which Code Is Better?
        </h1>
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
            className="absolute right-1/2 translate-x-1/2 bottom-1/2"
          />
        </div>
        <div className="max-w-[1280px] mx-auto p-6">
          <CommentsSection hasVoted={!!userVote} />
        </div>
      </main>
    </div>
  );
};

export default Home;
