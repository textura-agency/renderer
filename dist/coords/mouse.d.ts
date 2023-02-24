import { IGetMouseCoordsFromElement } from "../interfaces/mouse.interface";
declare const subscribeMouse: () => void;
declare const unsubscribeMouse: () => void;
declare const getMouseCoords: any;
declare const getMouseCoordsFromElement: (domElement: HTMLElement) => IGetMouseCoordsFromElement;
declare const isElementHovered: (domElement: HTMLElement, additionalRadius?: number) => boolean;
export { subscribeMouse, unsubscribeMouse, getMouseCoords, getMouseCoordsFromElement, isElementHovered };
