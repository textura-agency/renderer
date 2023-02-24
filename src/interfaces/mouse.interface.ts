export interface IMouse {
    mouse: MouseEvent | null,
}

export interface IGetMouseCoordsFromElement {
    top: {
        left: {
            x: null | number,
            y: null | number,
        },
        right: {
            x: null | number,
            y: null | number,
        }
    },
    center: {
        center: {
            x: null | number,
            y: null | number,
        }
    },
    bottom: {
        left: {
            x: null | number,
            y: null | number,
        },
        right: {
            x: null | number,
            y: null | number,
        }
    }
}

