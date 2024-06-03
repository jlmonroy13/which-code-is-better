import cx from "classnames";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeSnippetProps {
  className?: string;
  code: string;
  containerClassName?: string;
  language: string;
  onVote: () => void;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  className,
  code,
  containerClassName,
  language,
  onVote,
}) => {
  return (
    <div className={cx("h-full px-5 py-10", containerClassName)}>
      <div
        className={cx(
          "card rounded-lg grid grid-rows-[1fr_max-content] max-w-[595px] h-full gap-4",
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
        <button
          onClick={onVote}
          className=" gap-2 btn bg-green-400 border-2 text-neutral text-lg hover:bg-green-500 flex items-center justify-center w-full"
        >
          <AiOutlineThunderbolt size={25} />
          Vote
        </button>
      </div>
    </div>
  );
};

export default CodeSnippet;
