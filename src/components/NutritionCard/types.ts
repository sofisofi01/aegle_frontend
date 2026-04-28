import { StaticImageData } from "next/image";

export type NutritionCardProps = {
  id: number;
  title: string;
  calories?: number;
  proteins: number;
  carbs: number;
  fats: number;
  image: string | StaticImageData;
  isEaten?: boolean;
  onDelete?: (id: number) => void;
  onToggleEaten?: (id: number) => void;
  ingredients?: string;
  recipe?: string;
};
