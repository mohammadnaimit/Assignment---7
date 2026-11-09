"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const UserMenu = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // বাইরে ক্লিক করলে বা Esc চাপলে মেনু বন্ধ হবে
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট হয়েছে");
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-xl px-1.5 py-1 transition hover:bg-black/5"
      >
        {user.image ? (
          <Image
            alt={user.name ?? "User avatar"}
            src={user.image}
            width={36}
            height={36}
            className="size-9 rounded-xl bg-[#f1f1f1] object-cover"
          />
        ) : (
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#e3e9e5] text-[14px] font-bold text-[#0b8a43]">
            {user.name?.charAt(0)}
          </div>
        )}
        <span className="text-[14px] font-medium text-[#2b2b2b]">
          {user.name}
        </span>
        <svg
          aria-hidden="true"
          width="8"
          height="8"
          viewBox="0 0 10 6"
          fill="#6b6b6b"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[100] mt-2 w-56 rounded-xl border border-[#e3e9e5] bg-white p-3 shadow-lg"
        >
          {/* নাম ও ইমেইল */}
          <div className="px-1 pb-2">
            <p className="truncate text-[14px] font-semibold text-[#1f2a24]">
              {user.name}
            </p>
            <p className="truncate text-[12px] text-[#6b776f]">{user.email}</p>
          </div>

          <div className="my-1 h-px bg-[#e3e9e5]" />

          {/* প্রোফাইল */}
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-[13px] text-[#1f2a24] transition hover:bg-[#F4F7F4]"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
            আমার প্রোফাইল
          </Link>

          {/* সাইন আউট */}
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[13px] text-red-500 transition hover:bg-red-50"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 14L4 9l5-5" />
              <path d="M4 9h10a6 6 0 010 12h-3" />
            </svg>
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;