import { StaticImageData } from "next/image";

export type WorkoutMiniCardProps = {
    id: number;
    title: string;
    sets: string;
    image: string | StaticImageData;
    onDelete?: (id: number) => void;
    onUpdateSets?: (id: number, newSets: string) => void;
}