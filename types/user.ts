export interface UserInterface {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  emailVerified?: boolean | null;
}
