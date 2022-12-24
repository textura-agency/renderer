import { ITweenContext, ITweenFromTo } from "../interfaces/tween.interface";
declare const Tween: {
    to(from: ITweenFromTo, to: ITweenFromTo, { duration, renderDelay, delay, onChange, onComplete, ease }: {
        duration?: number;
        renderDelay?: number;
        delay?: number;
        onChange?: (context: ITweenContext) => void;
        onComplete?: (context: ITweenContext) => void;
        ease?: Function;
    }): void;
};
export default Tween;
