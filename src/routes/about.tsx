import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/lib/site";
import pancakes from "@/assets/pancakes-cutout.png";
import sushi from "@/assets/sushi-cutout.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About me — ${SITE.name}` },
      { name: "description", content: "Meet Viktorija Damberga, an AI Development student at JENSEN Yrkeshögskola with a background in healthcare, and her cats Pancakes and Sushi." },
      { property: "og:title", content: `About me — ${SITE.name}` },
      { property: "og:description", content: "Viktorija's journey from healthcare into AI development, with her unofficial coding assistants Pancakes and Sushi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell title="About me" subtitle="“She's the best human ever!” — Sushi">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-5 text-base leading-relaxed sm:text-lg">
          <h2 className="text-3xl font-semibold text-primary">Hello and welcome!</h2>
          <p>I'm an AI Development student at JENSEN Yrkeshögskola with a background in healthcare and a passion for technology that makes a difference.</p>
          <p>My journey into tech started with curiosity and a desire to explore new ways of solving problems. After spending years in healthcare, I've seen how much the right tools and technology can matter. I want to be part of building solutions that make people's lives a little easier.</p>
          <p>My goal is to keep learning, challenge myself, and eventually contribute to projects where technology meets real-world needs. I'm excited about where this journey might take me!</p>
          <p>Oh and remember the cats you met at the beginning of my portfolio? They're actually inspired by my very real cats! They're a pretty big part of my life since they are my unofficial coding assistants at the moment, so naturally, they had to make an appearance here too.</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-12">
          <CatPortrait name="Pancakes" image={pancakes} />
          <CatPortrait name="Sushi" image={sushi} />
        </div>
        <p className="mt-8 text-lg">Thanks for stopping by! 🩷</p>
      </div>
    </PageShell>
  );
}

function CatPortrait({ name, image }: { name: string; image: string }) {
  return (
    <figure className="flex min-w-0 flex-col items-center">
      <figcaption className="text-center">
        <span className="block font-display text-3xl font-semibold text-primary">{name}</span>
      </figcaption>
      <svg aria-hidden="true" viewBox="0 0 64 60" className="my-2 h-14 w-16 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3 C52 10 53 30 32 52 M27 40 L32 52 L44 47" />
      </svg>
      <img src={image} alt={`${name}, Viktorija's cat`} className="h-64 w-full object-contain object-top sm:h-80" />
    </figure>
  );
}
