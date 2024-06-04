interface SnippetInterface {
  code: string;
  language: string;
}

export interface RumbleInterface {
  snippets: SnippetInterface[];
  createdAt: Date;
}
