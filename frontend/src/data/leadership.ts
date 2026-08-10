export interface Leader {
  name: string;
  title: string;
  bio: string;
  image: string;
  category: "Board of Directors" | "Executive Management";
}

export const LEADERSHIP: Leader[] = [
  {
    name: "Shri S. K. Gupta",
    title: "Chairman & Managing Director",
    bio: "With over 35 years of distinguished leadership in infrastructure engineering, finance, and corporate strategy, Shri S. K. Gupta has steered Almondz Global Infra-Consultant Limited into a premier multi-disciplinary consultancy powerhouse.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    category: "Board of Directors"
  },
  {
    name: "Dr. R. K. Sharma",
    title: "Director — Technical & Engineering",
    bio: "An alumnus of IIT Delhi with a Ph.D. in Structural Engineering, Dr. Sharma oversees technical governance, mega-structure design integrity, and innovation across highways, tunnels, and smart infrastructure.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    category: "Board of Directors"
  },
  {
    name: "Ms. Ananya Sen",
    title: "Chief Financial Officer & Head of Advisory",
    bio: "Specializing in project finance, PPP structuring, and debt syndication, Ms. Sen leads the financial consultancy and transaction advisory divisions managing billions in infrastructure capital.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    category: "Executive Management"
  },
  {
    name: "Col. Rajesh Verma (Retd.)",
    title: "President — Project Management & PMC",
    bio: "Bringing decades of rigorous disciplined execution from military engineering corps to large-scale national highway and railway projects across difficult terrains.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    category: "Executive Management"
  }
];
