declare const subscribeMouse: () => void;
declare const unsubscribeMouse: () => void;
declare const getMouseCoords: () => {
    document: {
        x: null;
        y: null;
    };
    window: {
        x: null;
        y: null;
    };
} | {
    document: {
        x: number;
        y: number;
    };
    window: {
        x: number;
        y: number;
    };
};
declare const getMouseCoordsFromElement: (domElement: HTMLElement) => {
    top: {
        left: {
            x: null;
            y: null;
        };
        right: {
            x: null;
            y: null;
        };
    };
    center: {
        center: {
            x: null;
            y: null;
        };
    };
    bottom: {
        left: {
            x: null;
            y: null;
        };
        right: {
            x: null;
            y: null;
        };
    };
} | {
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
