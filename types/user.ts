export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
}
