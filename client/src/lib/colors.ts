export interface ColorScheme {
  id: string;
  name: string;
  hex: string;
}

export const colorSchemes: ColorScheme[] = [
  {
    id: "blue",
    name: "Blue",
    hex: "#2563eb", // blue-600
  },
  {
    id: "green",
    name: "Green",
    hex: "#16a34a", // green-600
  },
  {
    id: "purple",
    name: "Purple",
    hex: "#9333ea", // purple-600
  },
  {
    id: "gray",
    name: "Gray",
    hex: "#4b5563", // gray-600
  },
  {
    id: "red",
    name: "Red",
    hex: "#dc2626", // red-600
  },
];
