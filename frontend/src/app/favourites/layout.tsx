"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface LayoutProps {
  initialUser: SafeUser | null;
}

const FavouriteLayout: React.FC<LayoutProps> = ({ initialUser }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<SafeUser | null>(initialUser);
  const loginModal = useLoginModal(); 

  // checks if user is logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user as SafeUser);
    // login modal opens if user isn't logged in
    } else if (status === "unauthenticated") { 
      loginModal.onOpen();
    }
  }, [session, status, loginModal]);

  // loading animation when the information hasn't been processed yet
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }
  const favouriteIds = user?.favouriteId || []; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl text-center">
        {user ? (
          favouriteIds.length > 0 ? (
            <>
              <h2 className="mt-4 font-bold text-2xl text-gray-800">These are your favourite washrooms!</h2>
              <ul className="mt-4 space-y-2 w-full">
                {favouriteIds.map((washroomId: string) => (
                  <li key={washroomId} className="text-lg text-gray-700 bg-gray-50 rounded-lg p-4 shadow-md w-full text-center">
                    {washroomId}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2 className="mt-4 font-bold text-2xl text-gray-800">Whoops!</h2>
              <p className="mt-4 text-gray-600">You don't have any favorite washrooms! Go use one and add it to your list!</p>
            </>
          )
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800">Sign in to view your favourite washrooms!</h2>
            <p className="mt-4 text-gray-600">You need to be signed in to access your favourite washrooms.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FavouriteLayout;
