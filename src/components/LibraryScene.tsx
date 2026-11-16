import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Github, Linkedin, Heart, X } from "lucide-react";
import scene from "@/assets/whispering_library.jpg.asset.json";
import { SITE, CATS, GRUMPY_QUOTES, CAREFREE_QUOTES } from "@/lib/site";

type Tone = "grumpy" | "carefree";

function useQuote(list: string[], start: number) {
  const [i, setI] = useState(start);
  return [list[i % list.length] ?? "", () => setI((n) => n + 1)] as const;
}

// Puff positions written out in full so Tailwind generates every class.
const PUFFS = {
  "bottom-left": ["-bottom-2.5 right-7 h-3 w-4", "-bottom-[1.5rem] right-4 h-2.5 w-3", "-bottom-[2.35rem] right-1.5 h-1.5 w-2"],
  "bottom-right": ["-bottom-2.5 left-7 h-3 w-4", "-bottom-[1.5rem] left-4 h-2.5 w-3", "-bottom-[2.35rem] left-1.5 h-1.5 w-2"],
  "top-left": ["-top-2.5 right-7 h-3 w-4", "-top-[1.5rem] right-4 h-2.5 w-3", "-top-[2.35rem] right-1.5 h-1.5 w-2"],
  "top-right": ["-top-2.5 left-7 h-3 w-4", "-top-[1.5rem] left-4 h-2.5 w-3", "-top-[2.35rem] left-1.5 h-1.5 w-2"],
} as const;

function Cloud({ text, tone, side, puffs = "bottom" }: { text: string; tone: Tone; side: "left" | "right"; puffs?: "top" | "bottom" }) {
  const puff = tone === "grumpy" ? "border-grumpy" : "border-carefree";
  const rows = PUFFS[`${puffs}-${side}`];

  return (
    <div className="relative max-w-[11.5rem] lg:max-w-[15rem]">
      <div
        className={`border-2 bg-parchment px-4 py-3 font-display text-sm leading-snug shadow-glow sm:text-base lg:text-lg ${
          puffs === "top" ? "rounded-[3.2rem_2.6rem_3rem_2.4rem]" : "rounded-[2.6rem_3rem_2.4rem_3.2rem]"
        } ${
          tone === "grumpy"
            ? "border-grumpy text-parchment-foreground italic"
            : "border-carefree text-parchment-foreground"
        }`}
      >
        <span className="mb-1 block font-sans text-[0.65rem] font-bold uppercase tracking-widest text-accent lg:text-xs">
          {CATS[tone].name} · {CATS[tone].descriptor}
        </span>
        {text}
      </div>

      {/* thought puffs trailing toward the cat */}
      {rows.map((r) => (
        <span key={r} aria-hidden className={`absolute rounded-full border-2 bg-parchment ${puff} ${r}`} />
      ))}
    </div>
  );
}

export function LibraryScene() {
  const [grumpy, nextGrumpy] = useQuote(GRUMPY_QUOTES, 0);
  const [happy, nextHappy] = useQuote(CAREFREE_QUOTES, 0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const a = setInterval(nextGrumpy, 9000);
    const b = setInterval(nextHappy, 7000);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const menu = [
    { label: "Project blog", icon: BookOpen, to: "/projects" as const },
    { label: "About me", icon: Heart, to: "/about" as const },
  ];

  return (
    <div className="relative w-full">
      {/* Phone clouds stay above the picture, aligned with their cats. */}
      <div className="pointer-events-none grid grid-cols-2 items-end gap-4 px-3 pb-10 pt-2 md:hidden">
        <div key={grumpy} className="animate-float-in"><Cloud text={grumpy} tone="grumpy" side="left" /></div>
        <div key={happy} className="animate-float-in"><Cloud text={happy} tone="carefree" side="right" /></div>
      </div>
      <div className="relative mx-auto aspect-[1408/768] w-full max-w-[1600px] overflow-hidden">
        <img src={scene.url} alt="A cozy magical library with a glowing open book between a white cat and a brown cat" className="absolute inset-0 h-full w-full object-cover" />

        {/* Pancakes hotspot */}
        <button aria-label={`Talk to ${CATS.grumpy.name}, the white cat`} onClick={nextGrumpy}
          className="absolute left-[18%] top-[57%] h-[34%] w-[18%] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-ring" />
        {/* Sushi hotspot */}
        <button aria-label={`Talk to ${CATS.carefree.name}, the brown cat`} onClick={nextHappy}
          className="absolute left-[56%] top-[63%] h-[34%] w-[34%] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-ring" />
        {/* Book */}
        <button aria-label="Open the magical book menu" onClick={() => setOpen(true)}
          className="animate-glow absolute left-[40%] top-[37%] h-[19%] w-[20%] cursor-pointer rounded-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring" />

        {/* Quote clouds floating above each cat */}
        <div className="pointer-events-none absolute left-[26%] top-[56%] hidden -translate-x-1/2 -translate-y-full md:block">
          <div key={grumpy} className="animate-cloud-bob">
            <div className="animate-float-in"><Cloud text={grumpy} tone="grumpy" side="left" /></div>
          </div>
        </div>
        <div className="pointer-events-none absolute left-[73%] top-[62%] hidden -translate-x-1/2 -translate-y-full md:block">
          <div key={happy} className="animate-cloud-bob [animation-delay:1.2s]">
            <div className="animate-float-in"><Cloud text={happy} tone="carefree" side="right" /></div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="animate-float-in relative w-full max-w-md rounded-3xl border-2 border-primary bg-parchment p-6 text-parchment-foreground shadow-glow">
            <button aria-label="Close" onClick={() => setOpen(false)} className="absolute right-4 top-4 opacity-60 hover:opacity-100"><X className="h-5 w-5" /></button>
            <h2 className="text-center text-3xl font-semibold">Where shall we go?</h2>
            <p className="mb-5 text-center text-sm opacity-70">Choose a page from the book</p>
            <div className="grid grid-cols-2 gap-3">
              {menu.map((m) => (
                <Link key={m.to} to={m.to} className="flex flex-col items-center gap-2 rounded-2xl border border-parchment-foreground/20 p-4 transition hover:bg-primary/40">
                  <m.icon className="h-6 w-6" /> <span className="font-display text-lg font-semibold">{m.label}</span>
                </Link>
              ))}
              <a href={SITE.github} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-parchment-foreground/20 p-4 transition hover:bg-primary/40">
                <Github className="h-6 w-6" /> <span className="font-display text-lg font-semibold">GitHub</span>
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-parchment-foreground/20 p-4 transition hover:bg-primary/40">
                <Linkedin className="h-6 w-6" /> <span className="font-display text-lg font-semibold">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
