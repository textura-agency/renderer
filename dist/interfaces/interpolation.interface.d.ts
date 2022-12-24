export interface IInterpolationFunctions {
    piecewise: Function;
}
export interface IInterpolationConfig {
    timeline: any;
    interface: any;
}
interface IInterpolationTimelineElement {
    $TIME: number;
    [key: string]: number;
}
export type IInterpolationTimeline = IInterpolationTimelineElement[];
interface IIterpolationChild {
    [key: string]: number;
}
export interface IInterpolationInterface {
    [key: string]: IIterpolationChild & {
        $TIME: number[];
    };
}
export {};
