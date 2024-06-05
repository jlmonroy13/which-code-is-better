export interface User {
  resolvedBugs?: string[];
  _id: string;
  email: string;
  emailVerified?: boolean;
  image: string;
  name: string;
}

export interface Account {
  _id: string;
  access_token: string;
  scope: string;
  token_type: string;
  providerAccountId: string;
  provider: string;
  type: string;
  userId: string;
}

export interface Session {
  _id: string;
  sessionToken: string;
  userId: string;
  expires: string;
}
