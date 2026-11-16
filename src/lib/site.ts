import careAssistantPicture from "@/assets/care-assistant-ai.jpg.asset.json";
import minnesladanPicture from "@/assets/minnesladan-memory-box.jpg.asset.json";

export const SITE = {
  name: "Viktorija Damberga",
  github: "https://github.com/viktorijacodes",
  linkedin: "https://www.linkedin.com/in/viktorija-damberga-0130663a1",
};

export const CATS = {
  grumpy: { name: "Pancakes", descriptor: "the white one" },
  carefree: { name: "Sushi", descriptor: "the brown one" },
} as const;

export const GRUMPY_QUOTES = [
  "Hmph. Another visitor. Touch the book if you must.",
  "I was napping. Make it quick.",
  "The projects are fine. I've seen better. (I haven't.)",
  "Don't even think about petting me.",
  "LinkedIn? Humans and their networking. Ugh.",
  "Yes, I'm in the About page photo. No autographs.",
];

export const CAREFREE_QUOTES = [
  "Hiii! Welcome welcome! Click the glowing book! ✨",
  "She builds the coolest things, you'll love the projects!",
  "Don't mind Pancakes, she's just grumpy before her 14th nap.",
  "Psst… her GitHub is full of treasures!",
  "Wanna see a picture of us? Check About Me!",
  "Life is good. Sunbeams are good. You are good!",
];

export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  stack?: string;
  image: string;
  link?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Care Assistant AI",
    description:
      "An AI-powered application that helps care staff create personalised activities based on residents' interests, abilities and individual needs, making person-centred care easier to put into practice.",
    stack: "Python · Google Antigravity",
    image: careAssistantPicture.url,
    link: SITE.github,
  },
  {
    title: "Minneslådan",
    subtitle: "Memory box",
    description:
      "My very first Python project! An application where relatives can contribute personal memories and stories, which are converted into spoken audio to bring comfort to elderly people with dementia through familiar voices and meaningful memories.",
    stack: "Python · Tkinter · JSON · gTTS",
    image: minnesladanPicture.url,
  },
];
