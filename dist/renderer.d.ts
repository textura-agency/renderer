/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Render loop 2021
 * @version 1.0.0
**/
import { IRendererHandler, IRendererProps } from "./interfaces/renderer.interface";
declare const stopRender: () => void;
declare const startRender: () => void;
declare const setToRender: (args_0: IRendererProps) => void;
declare const removeFromRender: (label?: string | undefined) => void;
declare const getRendering: () => IRendererHandler[];
export { stopRender, startRender, setToRender, removeFromRender, getRendering };
