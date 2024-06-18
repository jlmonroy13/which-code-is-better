import cx from "classnames";
import { AiOutlineThunderbolt, AiOutlineCheckCircle } from "react-icons/ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeSnippetProps } from "./CodeSnippet.types";

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  className,
  code,
  containerClassName,
  language,
  hasVoted,
  isVoting,
  onVote,
}) => {
  return (
    <div className={cx("h-full px-5 py-10", containerClassName)}>
      <div
        className={cx(
          "card rounded-lg relative grid grid-rows-[1fr_max-content] max-w-[595px] h-full gap-4",
          className
        )}
      >
        <SyntaxHighlighter
          customStyle={{ margin: 0, padding: "24px", borderRadius: "8px" }}
          language={language}
          style={vscDarkPlus}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
        {hasVoted ? (
          <div className="absolute top-4 right-4 text-green-500">
            <AiOutlineCheckCircle size={60} />
          </div>
        ) : (
          <button
            onClick={onVote}
            className={cx(
              "gap-2 btn border-2 text-neutral text-lg flex items-center justify-center w-full transition-all duration-300 ease-in-out",
              {
                "bg-green-400 hover:bg-green-500": !isVoting,
                "bg-blue-400 hover:bg-blue-500 cursor-wait": isVoting,
              }
            )}
          >
            <AiOutlineThunderbolt size={25} />
            {isVoting ? "Voting..." : "Vote"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CodeSnippet;
