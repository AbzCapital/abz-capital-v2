"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InvestorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      // Create investor account
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.ok) {
          toast.success("Account created. Please login.");
          setMode("login");
        } else {
          toast.error(data.error || "Signup failed");
        }
      } catch {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Login
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      toast.success("Logged in successfully");
      router.push("/investor/dashboard");
    } else {
      toast.error(result?.error || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh">
      <Container size="sm">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-card">
          <h1 className="text-3xl font-extrabold text-ink mb-2">
            {mode === "login" ? "Investor Login" : "Create Investor Account"}
          </h1>
          <p className="text-muted-ink mb-6">
            {mode === "login"
              ? "Access your investment dashboard"
              : "Register for the ABZ investor platform"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-ink mb-1 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investor@example.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-ink mb-1 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo text-white hover:brightness-110"
            >
              {loading ? "Loading..." : mode === "login" ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-sm text-indigo hover:underline"
            >
              {mode === "login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-line">
            <Link href="/" className="text-xs text-muted-ink hover:text-ink">
              ← Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
