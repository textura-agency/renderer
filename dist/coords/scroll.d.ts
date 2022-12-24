declare const getElementDocumentCoords: (domElement: HTMLElement) => {
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
    width: number;
};
declare const getElementWindowCoords: (domElement: HTMLElement) => {
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
    width: number;
};
declare const getScrollCoordsFromElement: (domElement: HTMLElement) => {
    windowTop: {
        fromTop: number;
        fromBetweenTopMiddle: number;
        fromMiddle: number;
        fromBetweenMiddleBottom: number;
        fromBottom: number;
    };
    windowBottom: {
        fromTop: number;
        fromBetweenTopMiddle: number;
        fromMiddle: number;
        fromBetweenMiddleBottom: number;
        fromBottom: number;
    };
    windowRight: {
        fromRight: number;
        fromLeft: number;
    };
};
declare const isElementFullyVisibleX: (domElement: HTMLElement) => boolean;
declare const isElementFullyVisibleY: (domElement: HTMLElement) => boolean;
declare const isElementFullyVisible: (domElement: HTMLElement) => boolean;
declare const isElementPartableVisibleX: (domElement: HTMLElement) => boolean;
declare const isElementPartableVisibleY: (domElement: HTMLElement) => boolean;
declare const isElementPartableVisible: (domElement: HTMLElement) => boolean;
export { getElementDocumentCoords, getElementWindowCoords, getScrollCoordsFromElement, isElementFullyVisibleX, isElementFullyVisibleY, isElementFullyVisible, isElementPartableVisibleX, isElementPartableVisibleY, isElementPartableVisible, };
