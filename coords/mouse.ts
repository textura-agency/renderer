/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Convinient mouse coordinates api 2021
 * @version 1.0.0
**/

import { getElementDocumentCoords } from "./scroll"

const Mouse = {
    mouse: null,
    mouseListener: function(event) {
        this.mouse = event
        document.dispatchEvent(new CustomEvent("mouseupdate", {
            bubbles: true, 
            detail: { ...getMouseCoords() } 
        }))
    }.bind(this)
}

const subscribeMouse = function() {
    document.addEventListener('mousemove', this.mouseListener)
    document.addEventListener('mouseenter', this.mouseListener)
}.bind(Mouse)

const unsubscribeMouse = function() {
    document.removeEventListener('mousemove', this.mouseListener)
    document.removeEventListener('mouseenter', this.mouseListener)
}.bind(Mouse)

const getMouseCoords = function() {
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

const getMouseCoordsFromElement = function(domElement) {
    const domElementCoords = getElementDocumentCoords(domElement)
    const mouseCoords = getMouseCoords().document

    if (!domElementCoords.top || !domElementCoords.bottom ||
        !domElementCoords.left || !domElementCoords.right ||
        !domElementCoords.height || !domElementCoords.width ||
        !mouseCoords.x || !mouseCoords.y) { 
        console.error("getMouseCoordsFromElement: No domElement found")
        return {
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
    }
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
}.bind(Mouse)

const isElementHovered = function(domElement, additionalRadius = 0) {
    const domElementCoords = getElementDocumentCoords(domElement)
    const mouseCoords = getMouseCoords().document
    if (!domElementCoords.top || !domElementCoords.bottom ||
        !domElementCoords.left || !domElementCoords.right ||
        !domElementCoords.height || !domElementCoords.width ||
        !mouseCoords.x || !mouseCoords.y) { 
        console.error("isElementHovered: No domElement found")
        return false 
    }
    return (domElementCoords.top - additionalRadius < mouseCoords.y && domElementCoords.bottom + additionalRadius > mouseCoords.y && domElementCoords.left - additionalRadius < mouseCoords.x && domElementCoords.right + additionalRadius > mouseCoords.x)
}.bind(Mouse)

export {
    subscribeMouse,
    unsubscribeMouse,
    getMouseCoords,
    getMouseCoordsFromElement,
    isElementHovered
}