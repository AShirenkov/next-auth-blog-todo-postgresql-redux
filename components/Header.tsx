"use client";
// import Link from "next/link";
// import { useSession, signIn, signOut } from "next-auth/react";

import { Navigation } from "./Navigation";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
  },
];

export function Header() {
  //   const { data: session } = useSession();

  //   return (
  //     <nav>
  //       <Link href="/">Home</Link>
  //       {session && (
  //         <>
  //           <Link href="/todolist">ToDoList</Link>
  //           <Link href="/profile">Profile</Link>
  //         </>
  //       )}
  //       <Link href="/blogs">Blogs</Link>
  //       {session ? (
  //         <button onClick={() => signOut()}>Sign Out</button>
  //       ) : (
  //         <button onClick={() => signIn()}>Sign In</button>
  //       )}
  //     </nav>
  //   );
  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
}
