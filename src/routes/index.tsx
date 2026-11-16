import { createFileRoute } from "@tanstack/react-router";
import { LibraryScene } from "@/components/LibraryScene";
import { SITE } from "@/lib/site";

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
    <main className="flex min-h-svh flex-col justify-center py-4">
      <header className="px-4 pb-4 text-center">
        <h1 className="text-3xl font-semibold text-primary sm:text-4xl">{SITE.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tap the glowing book to explore · tap a cat to chat</p>
      </header>
      <LibraryScene />
    </main>
  );
}
