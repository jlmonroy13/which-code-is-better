import { UserInterface } from "./user";

export interface SnippetInterface {
  id: string;
  code: string;
  language: string;
}

export interface CommentInterface {
  id: string;
  userId: string;
  rumbleId: string;
  text: string;
  user: UserInterface;
  likes?: { userId: string }[];
  createdAt: Date;
}

export interface VoteInterface {
  id: string;
  userId: string;
  snippetId: string;
  createdAt: Date;
  rumbleId: string;
  user: { id: string };
  snippet?: SnippetInterface;
}

export interface RumbleInterface {
  id: string;
  rumbleWeek: string;
  createdAt: Date;
  title: string;
  comments: CommentInterface[];
  snippets: (SnippetInterface & { rumbleId: string; votes: VoteInterface[] })[];
  votes: VoteInterface[];
}
