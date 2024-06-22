import cx from "classnames";
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
          "card rounded-lg relative grid h-full",
          className,
          {
            "gradient-border": hasVoted,
            "opacity-80": isVoting,
            "hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-[1.02] cursor-pointer":
              !hasVoted && !isVoting,
          }
        )}
        onClick={onVote}
      >
        <div className="grid z-10">
          <SyntaxHighlighter
            customStyle={{ margin: 0, padding: "24px", borderRadius: "8px" }}
            language={language}
            style={vscDarkPlus}
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
