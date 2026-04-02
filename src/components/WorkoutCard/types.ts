import { StaticImageData } from "next/image";

export type WorkoutCardProps = {
    title: string;
    muscles: string;
    text: string;
    image?: string | StaticImageData;
    onAddToWorkout?: () => void; 
}