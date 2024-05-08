"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Card from "../UserCard";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="container mx-auto flex flex-wrap gap-5 p-5 flex-col md:flex-row items-center">
      <Link
        href="/"
        className="font-rufina font-bold title-font font-medium items-center text-sky-900"
      >
        <span className="mb-3 mt-3 ml-8 text-4xl">Soulage</span>
      </Link>
      <ul className="md:mr-auto md:ml-4 gap-5 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/mylist">Your List</Link>
        </li>
        <li>
          <Link href="/favourites">Favourites</Link>
        </li>
      </ul>
      <div className="bg-gray-100 p-[6px] rounded-md flex w-[40%] md:w-[40%] gap-3 md:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Find restrooms near you"
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div className="ml-5">
        {status === "authenticated" ? (
          <Card user={session.user} pagetype={"Navbar"} />
        ) : (
          <Link href="/login">Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
