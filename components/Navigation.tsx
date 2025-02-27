"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};
type props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: props) => {
  const pathname = usePathname();
  const session = useSession();
  console.log(session);

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? "active" : ""}
          >
            {link.label}
          </Link>
        );
      })}
      {session?.data && <Link href={"/todolist"}>Todo</Link>}
      {session?.data && <Link href={"/profile"}>Profile</Link>}
      {session?.data ? (
        <Link href={"#"} onClick={() => signOut({ callbackUrl: "/" })}>
          {`Sign out (${session.data.user?.name})`}
        </Link>
      ) : (
        <Link href={"/signin"}>Sign in</Link>
      )}
    </>
  );
};

export { Navigation };
