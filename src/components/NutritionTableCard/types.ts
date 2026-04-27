import { StaticImageData } from "next/image";

export type NutritionTableCardProps = {
  id: number;
  title: string;
  calories?: number;
  proteins?: number;
  carbs?: number;
  fats?: number;
  image: string | StaticImageData;
  onDelete?: (id: number) => void;
};
