export interface SnippetInterface {
  _id?: string;
  code: string;
  language: string;
}

export interface CommentInterface {
  _id?: string;
  userId: string;
  userImage?: string;
  userName?: string;
  text: string;
  createdAt?: Date;
}

export interface VoteInterface {
  _id?: string;
  userId: string;
  snippetId: string;
  rumbleDay: string;
  createdAt?: Date;
}

export interface RumbleInterface {
  _id?: string;
  snippets: SnippetInterface[];
  rumbleDay: string;
  comments: CommentInterface[];
  votes: VoteInterface[];
  createdAt?: Date;
}
