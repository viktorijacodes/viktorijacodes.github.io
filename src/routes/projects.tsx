import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PROJECTS, SITE } from "@/lib/site";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `My projects — ${SITE.name}` },
      { name: "description", content: "Pictures and short stories about the projects I have built." },
      { property: "og:title", content: `My projects — ${SITE.name}` },
      { property: "og:description", content: "Pictures and short stories about the projects I have built." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <PageShell title="My projects" titleClassName="text-center">
      <div className="grid gap-8 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.title} className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={`${p.title} project picture`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
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
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  See it on GitHub
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
