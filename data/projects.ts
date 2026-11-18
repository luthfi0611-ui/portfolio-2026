export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  url: string;
};

export const projects: Project[] = [
  {
    slug: "iqraul",
    title: "Iqraul'",
    category: "Web App",
    description: "A digital platform for discovering and reciting the Quran.",
    url: "https://iqraul.vercel.app/",
  },
  {
    slug: "bookhall",
    title: "BookHall",
    category: "React",
    description: "A modern book discovery platform.",
    url: "https://bookhall-react.vercel.app/",
  },
  {
    slug: "bread-papas",
    title: "Bread Papa's",
    category: "E-Commerce",
    description: "A bakery web shop with smooth UI and UX.",
    url: "https://bread-papas.vercel.app/",
  },
  {
    slug: "business-landing",
    title: "Business Landing",
    category: "Landing Page",
    description: "A clean and professional corporate landing page.",
    url: "https://business-landing-nine.vercel.app/",
  },
];