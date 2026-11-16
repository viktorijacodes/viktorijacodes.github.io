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
            <div className="aspect-video overflow-hidden bg-muted">
              {p.image ? (
                <img
                  src={p.image}
                  alt={`${p.title} project picture`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-10 w-10" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-semibold">{p.title}</h2>
              {p.subtitle && <p className="mt-1 text-sm italic text-muted-foreground">{p.subtitle}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              {p.stack && (
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {p.stack}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
