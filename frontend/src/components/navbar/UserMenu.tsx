"use client";
import { useSession, signOut } from "next-auth/react";
import { useCallback, useState, useEffect, useRef } from "react";
import MenuItem from "./MenuItem";
import Avatar from "../../app/profile/Avatar";
import { PiCaretDownThin } from "react-icons/pi";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const avatarSrc = session?.user?.image ?? "/path/to/default/avatar.png"; // Provide a default avatar path
  
  // handles profile click in the menu bar
  const handleProfileClick = () => {
    router.push('/profile');
  };

  // handles favourites click in menu bar
  const handleFavoritesClick = () => {
    router.push('/favourites');
  };

  return (
    <div className="relative z-10">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-3 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <PiCaretDownThin />{" "}
          <div className="hidden md:block">
            <Avatar src={avatarSrc} size={35} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[300px] bg-white overflow-hidden right-0 top-12 text-sm z-modal">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={handleProfileClick} label="Profile" />
                <MenuItem onClick={handleFavoritesClick} label="Favourites" />
                <hr />
                <MenuItem onClick={() => {}} label="Help Centre" />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                <hr />
                <MenuItem onClick={() => {}} label="Help Centre" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
