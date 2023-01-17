/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Convinient mouse coordinates api 2021
 * @version 1.0.1
**/
import { IMouse } from "../interfaces/mouse.interface"
import { getElementDocumentCoords } from "./scroll"

const Mouse: IMouse = {
    mouse: null,
}
const mouseListener = function(this: IMouse, e: MouseEvent) {
    this.mouse = e
    document.dispatchEvent(new CustomEvent("mouseupdate", {
        bubbles: true, 
        detail: { ...getMouseCoords() } 
    }))
}.bind(Mouse)

const subscribeMouse = function() {
    document.addEventListener('mousemove', mouseListener)
    document.addEventListener('mouseenter', mouseListener)
}

const unsubscribeMouse = function() {
    document.removeEventListener('mousemove', mouseListener)
    document.removeEventListener('mouseenter', mouseListener)
}

const getMouseCoords = function(this: IMouse) {
    if (this.mouse === null) { 
        return {
            document: {
                x: null,
                y: null,
            },
            window: {
                x: null,
                y: null
            }
        }
    }
    return {
        document: {
            x: this.mouse.pageX,
            y: this.mouse.pageY
        },
        window: {
            x: this.mouse.clientX,
            y: this.mouse.clientY,
        }
    }
}.bind(Mouse)

const getMouseCoordsFromElement = function(domElement: HTMLElement) {
    const domElementCoords = getElementDocumentCoords(domElement)
    const mouseCoords = getMouseCoords().document

    const nullObject = {
        top: {
            left: {
                x: null,
                y: null,
            },
            right: {
                x: null,
                y: null,
            }
        },
        center: {
            center: {
                x: null,
                y: null,
            }
        },
        bottom: {
            left: {
                x: null,
                y: null,
            },
            right: {
                x: null,
                y: null,
            }
        }
    }

    if (domElementCoords.top === null || domElementCoords.bottom === null ||
        domElementCoords.left === null || domElementCoords.right === null ||
        domElementCoords.height === null || domElementCoords.width === null) { 
        console.error("getMouseCoordsFromElement: No domElement found")
        return nullObject
    }
    if (mouseCoords.x === null || mouseCoords.y === null) { return nullObject }

    return {
        top: {
            left: {
                x: mouseCoords.x - (domElementCoords.left),
                y: mouseCoords.y - (domElementCoords.top),
            },
            right: {
                x: mouseCoords.x - (domElementCoords.left + domElementCoords.width),
                y: mouseCoords.y - (domElementCoords.top),
            }
        },
        center: {
            center: {
                x: mouseCoords.x - (domElementCoords.left + domElementCoords.width / 2),
                y: mouseCoords.y - (domElementCoords.top + domElementCoords.height / 2),
            }
        },
        bottom: {
            left: {
                x: mouseCoords.x - (domElementCoords.left),
                y: mouseCoords.y - (domElementCoords.bottom),
            },
            right: {
                x: mouseCoords.x - (domElementCoords.left + domElementCoords.width),
                y: mouseCoords.y - (domElementCoords.bottom),
            }
        }
    }
}

const isElementHovered = function(domElement: HTMLElement, additionalRadius: number = 0) {
    const domElementCoords = getElementDocumentCoords(domElement)
    const mouseCoords = getMouseCoords().document
    if (domElementCoords.top === null || domElementCoords.bottom === null ||
        domElementCoords.left === null || domElementCoords.right === null ||
        domElementCoords.height === null || domElementCoords.width === null) { 
        console.error("isElementHovered: No domElement found")
        return false 
    }
    if (mouseCoords.x === null || mouseCoords.y === null) { return false }
    return (domElementCoords.top - additionalRadius < mouseCoords.y && domElementCoords.bottom + additionalRadius > mouseCoords.y && domElementCoords.left - additionalRadius < mouseCoords.x && domElementCoords.right + additionalRadius > mouseCoords.x)
}

export {
    subscribeMouse,
    unsubscribeMouse,
    getMouseCoords,
    getMouseCoordsFromElement,
    isElementHovered
}