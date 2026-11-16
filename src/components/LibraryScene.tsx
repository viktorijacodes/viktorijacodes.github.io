import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Github, Linkedin, Heart } from "lucide-react";
import scene from "@/assets/archives-library-refined.webp";
import { SITE, CATS, GRUMPY_QUOTES, CAREFREE_QUOTES } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Tone = "grumpy" | "carefree";

function useQuote(list: string[], start: number) {
  const [i, setI] = useState(start);
  return [list[i % list.length] ?? "", () => setI((n) => n + 1)] as const;
}

// Puff positions written out in full so Tailwind generates every class.
const PUFFS = {
  "bottom-left": ["-bottom-1.5 right-7 h-2 w-3", "-bottom-3 right-5 h-1.5 w-2", "-bottom-[1.1rem] right-4 h-1 w-1.5"],
  "bottom-right": ["-bottom-1.5 left-7 h-2 w-3", "-bottom-3 left-5 h-1.5 w-2", "-bottom-[1.1rem] left-4 h-1 w-1.5"],
  "top-left": ["-top-2.5 right-7 h-3 w-4", "-top-[1.5rem] right-4 h-2.5 w-3", "-top-[2.35rem] right-1.5 h-1.5 w-2"],
  "top-right": ["-top-2.5 left-7 h-3 w-4", "-top-[1.5rem] left-4 h-2.5 w-3", "-top-[2.35rem] left-1.5 h-1.5 w-2"],
} as const;

function Cloud({ text, tone, side, puffs = "bottom" }: { text: string; tone: Tone; side: "left" | "right"; puffs?: "top" | "bottom" }) {
  const rows = PUFFS[`${puffs}-${side}`];

  return (
    <div className="cloud-glow relative w-[7.5rem] @[640px]:w-44 @[1024px]:w-52">
      <svg aria-hidden="true" viewBox="0 0 240 170" preserveAspectRatio="none" className="absolute inset-0 h-full w-full fill-parchment stroke-cloud-outline" strokeWidth="2">
        <path d="M30 38 C16 16 46 2 66 15 C78 -2 108 0 120 12 C138 -1 167 1 178 17 C203 5 224 20 218 40 C243 46 242 72 230 84 C244 104 231 125 214 128 C220 152 188 164 170 153 C155 172 132 168 120 158 C99 173 77 167 67 154 C42 169 19 151 25 132 C1 127 -4 102 11 86 C-3 65 9 44 30 38 Z" />
      </svg>
      <div
        className="relative flex h-[5.25rem] flex-col items-center justify-center px-3 py-2 text-center font-display text-[0.6875rem] font-normal not-italic leading-[1.05] text-parchment-foreground @[640px]:h-32 @[640px]:px-5 @[640px]:py-4 @[640px]:text-sm @[640px]:leading-snug @[1024px]:h-36 @[1024px]:text-base"
      >
        <span className="mb-1.5 block text-[0.5625rem] font-bold uppercase tracking-normal text-parchment-foreground @[640px]:mb-2 @[640px]:text-xs @[1024px]:text-sm">
          {CATS[tone].name}
        </span>
        <span className="block w-full text-balance">{text}</span>
      </div>

      {/* thought puffs trailing toward the cat */}
      {rows.map((r) => (
        <span key={r} aria-hidden className={`absolute rounded-full border-2 border-cloud-outline bg-parchment ${r}`} />
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
    { label: "My projects", icon: BookOpen, to: "/projects" as const },
    { label: "About me", icon: Heart, to: "/about" as const },
  ];

  return (
    <div className="library-scene relative mx-auto">
      <div className="@container library-picture relative mx-auto aspect-[1408/768] w-full overflow-hidden">
        <img src={scene} alt="A cozy magical library with a glowing open book between a white cat and a brown cat" fetchPriority="high" decoding="async" width={1920} height={1056} className="absolute inset-0 h-full w-full object-cover" />

        {/* Pancakes hotspot */}
        <Button variant="ghost" aria-label={`Talk to ${CATS.grumpy.name}, the white cat`} onClick={nextGrumpy}
          className="absolute left-[18%] top-[57%] h-[34%] w-[18%] rounded-full p-0 hover:bg-transparent" />
        {/* Sushi hotspot */}
        <Button variant="ghost" aria-label={`Talk to ${CATS.carefree.name}, the brown cat`} onClick={nextHappy}
          className="absolute left-[56%] top-[63%] h-[34%] w-[34%] rounded-full p-0 hover:bg-transparent" />
        {/* Book */}
        <Button variant="ghost" aria-label="Open the magical book menu" onClick={() => setOpen(true)}
          className="animate-glow absolute left-[40%] top-[35%] h-[23%] w-[20%] rounded-lg p-0 transition-transform hover:scale-105 hover:bg-transparent" />

        {/* Quote clouds floating above each cat */}
        <div className="pointer-events-none absolute left-[20%] top-[46%] -translate-x-1/2 -translate-y-full @[640px]:left-[23%] @[640px]:top-[50%]">
          <div key={grumpy} className="animate-cloud-bob">
            <div className="animate-float-in"><Cloud text={grumpy} tone="grumpy" side="left" /></div>
          </div>
        </div>
        <div className="pointer-events-none absolute left-[79%] top-[50%] -translate-x-1/2 -translate-y-full @[640px]:top-[56%]">
          <div key={happy} className="animate-cloud-bob [animation-delay:1.2s]">
            <div className="animate-float-in"><Cloud text={happy} tone="carefree" side="right" /></div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent aria-describedby={undefined} className="max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg border-primary/50 bg-parchment p-6 text-parchment-foreground shadow-glow sm:p-8">
            <BookOpen aria-hidden="true" className="mx-auto h-7 w-7 text-parchment-foreground/60" />
            <DialogTitle className="text-center font-display text-3xl tracking-normal">Where shall we go?</DialogTitle>
            <div className="grid grid-cols-2 gap-3">
              {menu.map((m) => (
                <Button asChild variant="outline" key={m.to} className="h-auto min-h-24 flex-col gap-3 rounded-lg border-parchment-foreground/20 bg-transparent p-4 hover:bg-primary/20 hover:text-parchment-foreground [&_svg]:size-6">
                <Link to={m.to}>
                  <m.icon className="h-6 w-6" /> <span className="font-display text-lg font-semibold">{m.label}</span>
                </Link>
                </Button>
              ))}
              <Button asChild variant="outline" className="h-auto min-h-24 flex-col gap-3 rounded-lg border-parchment-foreground/20 bg-transparent p-4 hover:bg-primary/20 hover:text-parchment-foreground [&_svg]:size-6">
              <a href={SITE.github} target="_blank" rel="noreferrer">
                <Github className="h-6 w-6" /> <span className="font-display text-lg font-semibold">GitHub</span>
              </a>
              </Button>
              <Button asChild variant="outline" className="h-auto min-h-24 flex-col gap-3 rounded-lg border-parchment-foreground/20 bg-transparent p-4 hover:bg-primary/20 hover:text-parchment-foreground [&_svg]:size-6">
              <a href={SITE.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-6 w-6" /> <span className="font-display text-lg font-semibold">LinkedIn</span>
              </a>
              </Button>
            </div>
          </DialogContent>
      </Dialog>
    </div>
  );
}
