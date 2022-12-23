/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Interpolation 2022
 * @version 0.2.0.beta
**/
import { IInterpolationConfig, IInterpolationInterface } from "../interfaces/interpolation.interface";
declare const interpolation: (config: IInterpolationConfig, time: number) => void | IInterpolationInterface;
export { interpolation };
