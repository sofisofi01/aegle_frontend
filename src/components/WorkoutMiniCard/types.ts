import { StaticImageData } from "next/image";

export type WorkoutMiniCardProps = {
    title: string;
    sets: string;
    image?: string | StaticImageData;
}