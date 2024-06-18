import { RumbleInterface } from "@/types/rumble";

export interface CodeSnippetProps {
  id: string;
  className?: string;
  code: string;
  containerClassName?: string;
  language: string;
  onVote?: () => void;
  hasVoted: boolean;
  isVoting: boolean;
}
