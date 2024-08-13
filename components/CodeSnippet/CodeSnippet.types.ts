export interface CodeSnippetProps {
  className?: string;
  code: string;
  containerClassName?: string;
  hasVoted: boolean;
  id: string;
  isRumbleActive: boolean;
  isVoting: boolean;
  language: string;
  onVote?: () => void;
  rumbleWinner?: string;
}
