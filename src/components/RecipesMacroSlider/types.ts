export type MacroSliderProps = {
    title: string;
    onRangeChange?: (min: number, max: number) => void;
    minValue?: number;
    maxValue?: number;
    unit?: string;
}