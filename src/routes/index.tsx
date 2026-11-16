import { createFileRoute } from "@tanstack/react-router";
import { LibraryScene } from "@/components/LibraryScene";
import { SITE } from "@/lib/site";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — The Whispering Library` },
      { name: "description", content: "Step into a magical library portfolio guided by two cats. Find projects, GitHub, LinkedIn and more." },
      { property: "og:title", content: `${SITE.name} — The Whispering Library` },
      { property: "og:description", content: "A magical library portfolio guided by two cats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="archives-home flex min-h-svh flex-col justify-center py-4">
      <header className="px-4 pb-4 text-center">
        <h1 className="text-3xl font-semibold text-primary sm:text-4xl">{SITE.name}</h1>
        <div aria-hidden="true" className="my-2 flex items-center justify-center gap-3 text-primary/60">
          <span className="h-px w-10 bg-primary/25" />
          <Sparkles className="h-3 w-3" />
          <span className="h-px w-10 bg-primary/25" />
        </div>
      </header>
      <LibraryScene />
    </main>
  );
}
