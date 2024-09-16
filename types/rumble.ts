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
  createdAt?: Date;
}

export interface RumbleInterface {
  id: string;
  snippets: SnippetInterface[];
  rumbleWeek: string;
  comments: CommentInterface[];
  votes: VoteInterface[];
  createdAt?: Date;
  title: string;
}
