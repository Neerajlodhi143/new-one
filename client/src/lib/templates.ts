export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const templates: TemplateOption[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and traditional design for corporate environments",
    color: "blue-600",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with visual emphasis and bold elements",
    color: "purple-600",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple and elegant with plenty of white space",
    color: "green-600",
  },
];
