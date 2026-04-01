import { StaticImageData } from 'next/image';

export type WorkoutProps = {
    title: string;
    muscles: string;
    text: string;
    image?: string | StaticImageData;
    onAddToWorkout?: () => void; 
};

export type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
}

export type WorkoutFilterSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
}

export type WorkoutCardProps = {
    title: string;
    muscles: string;
    text: string;
    image?: string | StaticImageData;
    onAddToWorkout?: () => void; 
}
