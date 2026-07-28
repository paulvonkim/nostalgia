export interface AboutCard {
  id: string;
  heading: string;
  caption: string;
  imageUrl: string;
  imageAlt: string;
}

export const aboutCards: AboutCard[] = [
  {
    id: "workspace",
    heading: "Workspace",
    caption:
      "My workspace, plants and all. The view is where a lot of the thinking happens.",
    imageUrl: "/images/paul/workspace.png",
    imageAlt: "Paul's desk with a laptop, monitor, notebook, and plants",
  },
  {
    id: "berlin",
    heading: "Berlin",
    caption:
      "I live in Berlin, and walk my dog every day, rain or shine. Weekends, we try to get out into nature.",
    imageUrl: "/images/paul/berlin.png",
    imageAlt: "A dog and its owner standing on a foggy lakeside dock",
  },
  {
    id: "pottery",
    heading: "Pottery",
    caption:
      "Outside of screens, I throw pottery. The wheel is the most meditative part of my week. These are some of my first pieces.",
    imageUrl: "/images/paul/pottery.png",
    imageAlt: "Several handmade ceramic bowls arranged on a wooden surface",
  },
  {
    id: "books",
    heading: "Books",
    caption:
      "Beyond the usual tech and UX reading, fiction is where I actually switch off. Emperor of Gladness by Ocean Vuong was one of my favorites this year.",
    imageUrl: "/images/paul/books.png",
    imageAlt: "A copy of The Emperor of Gladness by Ocean Vuong",
  },
  {
    id: "puppy",
    heading: "Puppy",
    caption:
      "Meet Carli, an extremely well-mannered Labradoodle, and a proven good boy in the office too.",
    imageUrl: "/images/paul/puppy.png",
    imageAlt: "A black Labradoodle sitting on grass covered in fallen petals",
  },
  {
    id: "running",
    heading: "Running",
    caption:
      "Running is where I do my clearest thinking. This one's from the full Berlin Marathon in 2025, first of hopefully many more.",
    imageUrl: "/images/paul/running.png",
    imageAlt: "Paul at the Brandenburg Gate wearing a Berlin Marathon bib",
  },
];
