import { StaticImageData } from "next/image";

export type NutritionTableCardProps = {
  id: number;
  title: string;
  calories?: number;
  proteins?: number;
  carbs?: number;
  fats?: number;
  image: string | StaticImageData;
  isEaten?: boolean;
  ingredients?: string;
  recipe?: string;
  onDelete?: (id: number) => void;
  onToggleEaten?: (id: number) => void;
};
