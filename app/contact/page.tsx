"use client";

import { useState } from "react";
import Navigation from "../components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Message sent", {
        description: "We’ll get back to you soon.",
      });

      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again in a bit.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-7xl px-8 py-12">
        <Navigation />

        <div className="mx-auto mt-16 max-w-2xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              Contact
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              Let’s talk
            </h1>
            <p className="mt-4 text-white/70">
              Whether you’re a chef, a collaborator, or just curious -
              we’d love to hear from you.
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#05130d] via-[#04100c] to-[#0c2a21] p-8 shadow-[0_35px_90px_rgba(2,6,23,0.65)]"
          >
            <div className="space-y-5">
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
                className="rounded-2xl bg-[#0b1b18] text-white"
              />

              <Input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
                className="rounded-2xl bg-[#0b1b18] text-white"
              />

              <Textarea
                placeholder="What’s on your mind?"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
                rows={5}
                className="rounded-2xl bg-[#0b1b18] text-white resize-none"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-amber-500 text-white hover:bg-amber-400"
              >
                {loading ? "Sending…" : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
