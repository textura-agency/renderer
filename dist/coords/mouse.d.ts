declare const subscribeMouse: () => void;
declare const unsubscribeMouse: () => void;
declare const getMouseCoords: any;
declare const getMouseCoordsFromElement: (domElement: HTMLElement) => {
    top: {
        left: {
            x: number;
            y: number;
        };
        right: {
            x: number;
            y: number;
        };
    };
    center: {
        center: {
            x: number;
            y: number;
        };
    };
    bottom: {
        left: {
            x: number;
            y: number;
        };
        right: {
            x: number;
            y: number;
        };
    };
};
declare const isElementHovered: (domElement: HTMLElement, additionalRadius?: number) => boolean;
export { subscribeMouse, unsubscribeMouse, getMouseCoords, getMouseCoordsFromElement, isElementHovered };
