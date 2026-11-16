import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Github, Linkedin, Heart, X } from "lucide-react";
import scene from "@/assets/whispering_library.jpg.asset.json";
import { SITE, GRUMPY_QUOTES, CAREFREE_QUOTES } from "@/lib/site";

function useQuote(list: string[], start: number) {
  const [i, setI] = useState(start);
  return [list[i % list.length] ?? "", () => setI((n) => n + 1)] as const;
}

function Bubble({ text, tone, side }: { text: string; tone: "grumpy" | "carefree"; side: "left" | "right" }) {
  return (
    <div
      key={text}
      className={`animate-float-in max-w-[15rem] rounded-2xl border-2 px-4 py-3 font-display text-base leading-snug shadow-glow sm:text-lg ${
        tone === "grumpy"
          ? "border-grumpy bg-parchment text-parchment-foreground italic"
          : "border-carefree bg-parchment text-parchment-foreground"
      } ${side === "left" ? "rounded-bl-sm" : "rounded-br-sm"}`}
    >
      <span className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-accent">
        {tone === "grumpy" ? "Grumpy · the white one" : "Sunny · the brown one"}
      </span>
      {text}
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
      <div className="relative mx-auto aspect-[1408/768] w-full max-w-[1600px] overflow-hidden">
        <img src={scene.url} alt="A cozy magical library with a glowing open book between a white cat and a brown cat" className="absolute inset-0 h-full w-full object-cover" />

        {/* Grumpy cat hotspot */}
        <button aria-label="Talk to the grumpy white cat" onClick={nextGrumpy}
          className="absolute left-[18%] top-[57%] h-[34%] w-[18%] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-ring" />
        {/* Happy cat hotspot */}
        <button aria-label="Talk to the happy brown cat" onClick={nextHappy}
          className="absolute left-[56%] top-[63%] h-[34%] w-[34%] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-ring" />
        {/* Book */}
        <button aria-label="Open the magical book menu" onClick={() => setOpen(true)}
          className="animate-glow absolute left-[40%] top-[37%] h-[19%] w-[20%] cursor-pointer rounded-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring" />

        {/* Bubbles on larger screens */}
        <div className="pointer-events-none absolute left-[4%] top-[30%] hidden md:block"><Bubble text={grumpy} tone="grumpy" side="left" /></div>
        <div className="pointer-events-none absolute right-[4%] top-[34%] hidden md:block"><Bubble text={happy} tone="carefree" side="right" /></div>
      </div>

      {/* Bubbles on phones */}
      <div className="flex flex-col gap-3 px-4 py-5 md:hidden">
        <button onClick={nextGrumpy} className="self-start text-left"><Bubble text={grumpy} tone="grumpy" side="left" /></button>
        <button onClick={nextHappy} className="self-end text-left"><Bubble text={happy} tone="carefree" side="right" /></button>
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
