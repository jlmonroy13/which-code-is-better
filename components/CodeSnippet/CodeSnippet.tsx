import { useRumble } from "@/context/rumbleContext";
import { getIsWeekPassed } from "@/utils/date";
import cx from "classnames";
import { useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeSnippetProps } from "./CodeSnippet.types";

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  className,
  code,
  containerClassName,
  hasVoted,
  id,
  isRumbleActive,
  isVoting,
  language,
  onVote,
  rumbleWinner,
}) => {
  const { rumble } = useRumble();

  const isWeekPassed = useMemo(() => {
    if (!rumble?.rumbleWeek) return false;
    return getIsWeekPassed(rumble?.rumbleWeek);
  }, [rumble?.rumbleWeek]);

  return (
    <div className={cx("h-full px-5 py-10", containerClassName)}>
      <div
        className={cx(
          "card rounded-lg relative grid h-full max-w-[595px]",
          className,
          {
            "gradient-border": hasVoted,
            "opacity-80": isVoting,
            "hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-[1.02] cursor-pointer":
              !hasVoted && !isVoting && isRumbleActive,
          }
        )}
        onClick={onVote}
      >
        {rumbleWinner === id && isWeekPassed && (
          <div
            className={cx(
              "absolute inset-0 z-20 flex items-center justify-center bg-success/15 uppercase text-5xl rounded-lg",
              "text-success/20 font-bold hover:opacity-0 transition-opacity duration-300 ease-in-out tracking-widest"
            )}
          >
            <span className="-rotate-[20deg]">Winner</span>
          </div>
        )}
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
