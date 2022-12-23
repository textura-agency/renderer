/**
 * @fileoverview lerp functions for tweening 2022
 * @version 1.0.0
**/
import { IEase } from "../interfaces/ease.interface";
declare const lerp: (start: number, end: number, t?: number) => number;
declare const Ease: IEase;
export { lerp };
export default Ease;
