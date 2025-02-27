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
    label: "blogs",
    href: "/blogs",
  },
  {
    label: "About",
    href: "/about",
  },
];

export function Header() {
  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
}
