import { signOut } from "@/actions/signOutAction";
import { User } from "@/types/user";
import { ROUTES } from "@/routes";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
// import logo from "../../public/logo.svg";

interface UserProfileProps {
  user?: User | null;
}

const AUTH_ROUTES = Object.values(ROUTES.AUTH);

const UserProfile = ({ user }: UserProfileProps) => {
  const pathname = usePathname();

  if (AUTH_ROUTES.includes(pathname)) return null;

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="rounded-md btn bg-primary px-6 py-2 text-sm text-neutral transition-colors hover:bg-primary/80"
      >
        Log in
      </Link>
    );
  }

  return (
    <Menu as="div" className="relative z-50 ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            className="rounded-full"
            src={user?.image || ''}
            alt="Image of user profile"
            width={32}
            height={32}
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem>
            <Link
              href={`/user/${user?._id}`}
              className="block px-4 py-2 text-sm text-gray-700"
            >
              Your Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserProfile;
