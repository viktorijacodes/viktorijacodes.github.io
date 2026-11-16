export const SITE = {
  name: "Viktorija Damberga",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
};

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
  "She builds the coolest things, you'll love the project blog!",
  "Don't mind him, he's just grumpy before his 14th nap.",
  "Psst… her GitHub is full of treasures!",
  "Wanna see a picture of us? Check About Me!",
  "Life is good. Sunbeams are good. You are good!",
];

export type Project = { title: string; description: string; image: string; link?: string };

export const PROJECTS: Project[] = [
  {
    title: "Sample project one",
    description: "A short description of what this project does and what you learned building it.",
    image: "",
  },
  {
    title: "Sample project two",
    description: "Another little story about a thing you made, the tools you used and why.",
    image: "",
  },
];
