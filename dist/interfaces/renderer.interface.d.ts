export interface IRenderer {
    handlers: Array<IRendererHandler>;
    isRendering: boolean;
}
export interface IRendererProps {
    handler: Function;
    label: string | number;
    delay: number;
}
export interface IRendererHandler {
    handler: Function;
    label: string | number;
    delay: number;
    startTime: number;
    rendering(time: number): void;
}
