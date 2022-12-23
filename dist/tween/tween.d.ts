/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Light optimised tween 2022
 * @version 1.0.0
**/
import { ITweenContext, ITweenFromTo } from "../interfaces/tween.interface";
declare const Tween: {
    to(from: ITweenFromTo, to: ITweenFromTo, { duration, renderDelay, delay, onChange, onComplete, ease }: {
        duration?: number | undefined;
        renderDelay?: number | undefined;
        delay?: number | undefined;
        onChange?: ((context: ITweenContext) => void) | undefined;
        onComplete?: ((context: ITweenContext) => void) | undefined;
        ease?: Function | undefined;
    }): void;
};
export default Tween;
