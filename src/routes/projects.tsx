import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PROJECTS, SITE } from "@/lib/site";
import { ImageIcon } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Project blog — ${SITE.name}` },
      { name: "description", content: "Pictures and short stories about the projects I have built." },
      { property: "og:title", content: `Project blog — ${SITE.name}` },
      { property: "og:description", content: "Pictures and short stories about the projects I have built." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <PageShell title="Project blog" subtitle="“They're fine, I suppose.” — Pancakes">
      <div className="grid gap-8 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.title} className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="flex aspect-video items-center justify-center bg-muted text-muted-foreground">
              <ImageIcon className="h-10 w-10" />
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
