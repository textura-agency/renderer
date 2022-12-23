/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Piecewise function for itl 2022
 * @version 0.2.0.beta
**/
import { IInterpolationTimeline, IInterpolationInterface } from "../interfaces/interpolation.interface";
declare const piecewise: (key: string, times: number[], tInterface: IInterpolationInterface, timeline: IInterpolationTimeline, time: number) => any;
export { piecewise };
