import { getRumble } from "@/utils/api/rumble";
import cx from "classnames";
import { Orbitron } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import CodeSnippet from "../components/CodeSnippet";
import CommentsSection from "../components/CommentsSection";

const orbitron = Orbitron({ subsets: ["latin"] });

const Home: React.FC = async () => {
  const rumble = await getRumble("665fa896bf97cd67b29ae4a7");

  if (!rumble) return null;

  const { snippets } = rumble;
  const [snippet1, snippet2] = snippets;

  // const handleVoteSnippet1 = (): void => {
  //   console.log("Voted for Snippet 1");
  // };

  // const handleVoteSnippet2 = (): void => {
  //   console.log("Voted for Snippet 2");
  // };

  return (
    <div className="min-h-screen bg-base-100">
      <Head>
        <title>Which Code Is Better?</title>
        <meta name="description" content="Daily code snippet comparisons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          <CodeSnippet
            className="ml-auto"
            code={snippet1.code}
            containerClassName="bg-gradient-to-t from-red-500 to-base-100"
            language={snippet1.language}
            // onVote={handleVoteSnippet1}
          />
          <CodeSnippet
            className="mr-auto"
            code={snippet2.code}
            containerClassName="bg-gradient-to-t from-blue-500 to-base-100"
            language={snippet2.language}
            // onVote={handleVoteSnippet2}
          />
          <Image
            src="/vs.png"
            width={70}
            height={70}
            alt="vs"
            className="absolute right-1/2 translate-x-1/2 bottom-1/2"
          />
        </div>
        <div className="max-w-[1280px] mx-auto p-6">
          <CommentsSection snippetId="snippet1" />
        </div>
      </main>
    </div>
  );
};

export default Home;
