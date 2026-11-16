import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/lib/site";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About me — ${SITE.name}` },
      { name: "description", content: "A little about me and my two cats." },
      { property: "og:title", content: `About me — ${SITE.name}` },
      { property: "og:description", content: "A little about me and my two cats." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell title="About me" subtitle="“She's the best human ever!” — Sushi">
      <div className="grid items-start gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-3xl border-2 border-primary/40 bg-card text-muted-foreground">
          <Camera className="h-10 w-10" />
          <span className="text-sm">Photo of me & my cats goes here</span>
        </div>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>Hi, I'm {SITE.name.split(" ")[0]}! This is a placeholder for your story — who you are, what you love building, and what you're curious about.</p>
          <p>I share my home with two cats: Pancakes, a small white grump who disapproves of everything, and Sushi, a big brown sweetheart who loves everyone.</p>
        </div>
      </div>
    </PageShell>
  );
}
