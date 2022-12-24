import { IEase } from "./ease.interface";
export interface ITween {
    to(from: ITweenFromTo, to: ITweenFromTo): void;
}
export interface ITweenConfig {
    duration: number;
    renderDelay: number;
    delay: number;
    onChange(context: ITweenContext): void;
    onComplete(context: ITweenContext): void;
    ease: IEase;
}
export interface ITweenFromTo {
    [key: string]: number | ITweenFromTo;
}
export interface ITweenContext {
    value: number | object;
    state: {
        hole: number;
        nothole: number;
    };
}
