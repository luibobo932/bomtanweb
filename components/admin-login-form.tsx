"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Thieu env Supabase. Hay tao .env.local tu .env.example.");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
      <input
        className="field"
        placeholder="Email admin"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className="field"
        placeholder="Mat khau"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="primary-btn" type="submit" disabled={isPending}>
        {isPending ? "Dang dang nhap..." : "Dang nhap admin"}
      </button>
      {message ? <div className="text-sm text-[var(--brand-deep)]">{message}</div> : null}
    </form>
  );
}
