import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function PageShell({ title, subtitle, titleClassName, children }: { title: string; subtitle?: string; titleClassName?: string; children: ReactNode }) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to the library
      </Link>
      <h1 className={`mt-6 text-5xl font-semibold text-primary ${titleClassName ?? ""}`}>{title}</h1>
      {subtitle && <p className="mt-2 italic text-muted-foreground">{subtitle}</p>}
      <div className="mt-10">{children}</div>
    </main>
  );
}
