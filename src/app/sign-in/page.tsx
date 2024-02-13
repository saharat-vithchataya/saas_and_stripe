"use client";

import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="max-w-xs w-full border rounded-md border-zinc-200 shadow-sm flex flex-col gap-6 p-6">
        <p className="text-2xl font-medium">Sign in</p>
        <button
          onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
          className="px-4 py-2 bg-violet-600 text-white font-medium rounded-lg"
        >
          Sign in with Discord
        </button>
      </div>
    </div>
  );
}
