"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Card from "../UserCard";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter()
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("")

  const handleClick = () => {
    router.push(`/search/${encodeURIComponent(search)}`)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter")
      router.push(`/search/${encodeURIComponent(search)}`)
  }

  return (
    <div className="container mx-auto flex flex-wrap gap-5 p-5 flex-col md:flex-row items-center">
      <Link href="/" className="font-rufina font-bold title-font font-medium items-center text-sky-900">
        <span className="mb-3 mt-3 ml-8 text-4xl">Soulage</span>
      </Link>
      <div className="md:mr-auto md:ml-4 gap-5 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <Link href="/profile" className="hover:text-lg hover:font-bold flex items-center justify-center text-center py-1 px-2 w-32 h-12">
          <h2>Profile</h2>
        </Link>
        <Link href="/mylist" className="hover:text-lg hover:font-bold flex items-center justify-center text-center py-1 px-2 w-32 h-12">
          <h2>Your List</h2>
        </Link>
        <Link href="/favourites" className="hover:text-lg hover:font-bold flex items-center justify-center text-center py-1 px-2 w-32 h-12">
          <h2>Favourites</h2>
        </Link>
      </div>
      {/* Search bar below */}
      <div
        className=" bg-gray-100 p-[6px] rounded-md
      flex w-[40%] md:w-[40%] gap-3 md:flex"
      >
        <button type="submit" onClick={handleClick}>
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
        </button>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Find restrooms near you"
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div className="ml-5">
        {status === "authenticated" ? (
          <Card user={session.user} pagetype={"Navbar"} />
        ) : (
          <Link href="/login" className="hover:bg-gray-200 border-2 border-solid flex justify-center items-center py-1 px-1 w-24 h-12">Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
