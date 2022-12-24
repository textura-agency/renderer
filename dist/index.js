(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Renderer = {}));
})(this, (function (exports) { 'use strict';

    const Renderer = {
        handlers: [],
        isRendering: false,
    };
    const stopRender = function () {
        this.isRendering = false;
    }.bind(Renderer);
    const startRender = function () {
        this.isRendering = true;
        requestAnimationFrame(function render(time) {
            if (!this.isRendering) {
                return;
            }
            this.handlers.forEach((item) => item.rendering(time));
            requestAnimationFrame(render.bind(Renderer));
        }.bind(Renderer));
    }.bind(Renderer);
    const setToRender = function ({ label, handler, delay }) {
        const newLabel = label || this.handlers.length;
        if (!handler) {
            console.error(`Renderer: Handler for render is required. Handler label "${newLabel}"`);
            return;
        }
        if (typeof handler !== "function") {
            console.error(`Renderer: Invalid type of handler, required Function. Handler label "${newLabel}"`);
            return;
        }
        this.handlers.push({
            handler,
            label: newLabel,
            delay: delay || 10,
            startTime: performance.now(),
            rendering(time) {
                if (time - this.startTime >= this.delay) {
                    this.startTime = performance.now();
                    this.handler(time);
                }
            },
        });
    }.bind(Renderer);
    const removeFromRender = function (label = 'removeLastFromRender') {
        let isRequested = 0;
        if (label === 'removeLastFromRender') {
            this.handlers = this.handlers.slice(0, this.handlers.length - 1);
            return;
        }
        this.handlers = this.handlers.filter((item) => {
            if (item.label !== label) {
                return true;
            }
            isRequested++;
            return false;
        });
        if (isRequested === 0) {
            console.warn(`Renderer: No handlers with label "${label}" in rendering`);
        }
    }.bind(Renderer);
    const getRendering = function () {
        return this.handlers;
    }.bind(Renderer);

    const getElementDocumentCoords = (domElement) => {
        if (!domElement) {
            console.error('getElementDocumentCoords: no domElement found');
            return {
                top: null,
                bottom: null,
                left: null,
                right: null,
                height: null,
                width: null
            };
        }
        return {
            top: domElement.getBoundingClientRect().top + window.scrollY,
            bottom: domElement.getBoundingClientRect().bottom + window.scrollY,
            left: domElement.getBoundingClientRect().left + window.scrollX,
            right: domElement.getBoundingClientRect().right + window.scrollX,
            height: domElement.getBoundingClientRect().height,
            width: domElement.getBoundingClientRect().width,
        };
    };
    const getElementWindowCoords = (domElement) => {
        if (!domElement) {
            console.error('getElementWindowCoords: no domElement found');
            return {
                top: null,
                bottom: null,
                left: null,
                right: null,
                height: null,
                width: null
            };
        }
        return {
            top: domElement.getBoundingClientRect().top,
            bottom: domElement.getBoundingClientRect().bottom,
            left: domElement.getBoundingClientRect().left,
            right: domElement.getBoundingClientRect().right,
            height: domElement.getBoundingClientRect().height,
            width: domElement.getBoundingClientRect().width,
        };
    };
    const getScrollCoordsFromElement = (domElement) => {
        const domElementCoords = getElementDocumentCoords(domElement);
        if (domElementCoords.top === null || domElementCoords.bottom === null ||
            domElementCoords.left === null || domElementCoords.right === null ||
            domElementCoords.height === null || domElementCoords.width === null) {
            console.error("getScrollCoordsFromElement: No domElement found");
            return {
                windowTop: {
                    fromTop: null,
                    fromBetweenTopMiddle: null,
                    fromMiddle: null,
                    fromBetweenMiddleBottom: null,
                    fromBottom: null
                },
                windowBottom: {
                    fromTop: null,
                    fromBetweenTopMiddle: null,
                    fromMiddle: null,
                    fromBetweenMiddleBottom: null,
                    fromBottom: null
                },
                windowRight: {
                    fromRight: null,
                    fromLeft: null
                }
            };
        }
        return {
            windowTop: {
                fromTop: window.scrollY - domElementCoords.top,
                fromBetweenTopMiddle: window.scrollY - (domElementCoords.top + domElementCoords.height / 4),
                fromMiddle: window.scrollY - (domElementCoords.top + domElementCoords.height / 2),
                fromBetweenMiddleBottom: window.scrollY - (domElementCoords.bottom - domElementCoords.height / 4),
                fromBottom: window.scrollY - domElementCoords.bottom
            },
            windowBottom: {
                fromTop: window.scrollY + window.innerHeight - domElementCoords.top,
                fromBetweenTopMiddle: window.scrollY + window.innerHeight - (domElementCoords.top + domElementCoords.height / 4),
                fromMiddle: window.scrollY + window.innerHeight - (domElementCoords.top + domElementCoords.height / 2),
                fromBetweenMiddleBottom: window.scrollY + window.innerHeight - (domElementCoords.bottom - domElementCoords.height / 4),
                fromBottom: window.scrollY + window.innerHeight - domElementCoords.bottom
            },
            windowRight: {
                fromRight: window.innerWidth - domElementCoords.right,
                fromLeft: window.innerWidth - domElementCoords.left
            }
        };
    };
    const isElementVisible = (domElement) => {
        const domElementCoords = getElementDocumentCoords(domElement);
        if (domElementCoords.top === null || domElementCoords.bottom === null ||
            domElementCoords.left === null || domElementCoords.right === null ||
            domElementCoords.height === null || domElementCoords.width === null) {
            console.error("isElementVisible: No domElement found");
            return {
                partable: {
                    x: false,
                    y: false
                },
                fully: {
                    x: false,
                    y: false
                }
            };
        }
        return {
            partable: {
                x: domElementCoords.right >= 0 && domElementCoords.left <= window.innerWidth,
                y: domElementCoords.bottom >= window.scrollY && domElementCoords.top <= window.scrollY + window.innerHeight
            },
            fully: {
                x: domElementCoords.right <= window.innerWidth && domElementCoords.left >= 0,
                y: domElementCoords.bottom <= window.scrollY + window.innerHeight && domElementCoords.top >= window.scrollY
            }
        };
    };
    const isElementFullyVisibleX = (domElement) => {
        return isElementVisible(domElement).fully.x;
    };
    const isElementFullyVisibleY = (domElement) => {
        return isElementVisible(domElement).fully.y;
    };
    const isElementFullyVisible = (domElement) => {
        return isElementFullyVisibleX(domElement) && isElementFullyVisibleY(domElement);
    };
    const isElementPartableVisibleX = (domElement) => {
        return isElementVisible(domElement).partable.x;
    };
    const isElementPartableVisibleY = (domElement) => {
        return isElementVisible(domElement).partable.y;
    };
    const isElementPartableVisible = (domElement) => {
        return isElementPartableVisibleX(domElement) || isElementPartableVisibleY(domElement);
    };

    const Mouse = {
        mouse: null,
    };
    const mouseListener = function (e) {
        this.mouse = e;
        document.dispatchEvent(new CustomEvent("mouseupdate", {
            bubbles: true,
            detail: { ...getMouseCoords() }
        }));
    }.bind(Mouse);
    const subscribeMouse = function () {
        document.addEventListener('mousemove', mouseListener);
        document.addEventListener('mouseenter', mouseListener);
    };
    const unsubscribeMouse = function () {
        document.removeEventListener('mousemove', mouseListener);
        document.removeEventListener('mouseenter', mouseListener);
    };
    const getMouseCoords = function () {
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
            };
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
        };
    }.bind(Mouse);
    const getMouseCoordsFromElement = function (domElement) {
        const domElementCoords = getElementDocumentCoords(domElement);
        const mouseCoords = getMouseCoords().document;
        if (!domElementCoords.top || !domElementCoords.bottom ||
            !domElementCoords.left || !domElementCoords.right ||
            !domElementCoords.height || !domElementCoords.width ||
            !mouseCoords.x || !mouseCoords.y) {
            console.error("getMouseCoordsFromElement: No domElement found");
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
            };
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
        };
    };
    const isElementHovered = function (domElement, additionalRadius = 0) {
        const domElementCoords = getElementDocumentCoords(domElement);
        const mouseCoords = getMouseCoords().document;
        if (!domElementCoords.top || !domElementCoords.bottom ||
            !domElementCoords.left || !domElementCoords.right ||
            !domElementCoords.height || !domElementCoords.width ||
            !mouseCoords.x || !mouseCoords.y) {
            console.error("isElementHovered: No domElement found");
            return false;
        }
        return (domElementCoords.top - additionalRadius < mouseCoords.y && domElementCoords.bottom + additionalRadius > mouseCoords.y && domElementCoords.left - additionalRadius < mouseCoords.x && domElementCoords.right + additionalRadius > mouseCoords.x);
    };

    const piecewise = (key, times, tInterface, timeline, time) => {
        if (times.length === 1) {
            return tInterface[key] = { ...timeline.filter(_ => _.$TIME === times[0])[0][key], $TIME: tInterface[key].$TIME };
        }
        const tA = times[0];
        const tB = times[1];
        const pA = timeline.filter(_ => _.$TIME === tA)[0][key];
        const pB = timeline.filter(_ => _.$TIME === tB)[0][key];
        if (pA === undefined || pB === undefined) {
            console.error(`[ITL]: invalid $TIME in Interface "${key}, ${tA}, ${tB}"`);
            return;
        }
        const t = Math.max(Math.min(time, tB), tA);
        Object.keys(tInterface[key]).forEach((innerKey) => {
            if (key === '$TIME' || innerKey === '$TIME') {
                return;
            }
            tInterface[key][innerKey] = (t - tA) / (tB - tA) * (pB[innerKey] - pA[innerKey]) + pA[innerKey];
        });
    };

    const functions = {
        piecewise
    };
    const getInterpolated = (config, time) => {
        const calc = functions.piecewise;
        const timeline = config.timeline;
        const tInterface = config.interface;
        if (timeline.length < 2) {
            return console.error('[interpolation]: Minimum count of points "2"');
        }
        fillInterface();
        return tInterface;
        function fillInterface() {
            for (let key in tInterface) {
                const times = tInterface[key].$TIME;
                if (times.length < 2) {
                    return console.error('[interpolation]: Minimum count children in $TIME: [] in interpolationInterfce "2"');
                }
                if (time < times[0]) {
                    calc(key, [times.at(0)], tInterface, timeline, time);
                }
                else if (time >= times[times.length - 1]) {
                    calc(key, [times.at(-1)], tInterface, timeline, time);
                }
                else {
                    for (let i = 0; i < times.length - 1; i++) {
                        if (time >= times[i] && time < times[i + 1]) {
                            calc(key, [times.at(i), times.at(i + 1)], tInterface, timeline, time);
                        }
                    }
                }
            }
        }
    };

    const lerp = (start, end, t = 0.075) => {
        return start + (end - start) * t;
    };

    exports.getElementDocumentCoords = getElementDocumentCoords;
    exports.getElementWindowCoords = getElementWindowCoords;
    exports.getInterpolated = getInterpolated;
    exports.getMouseCoords = getMouseCoords;
    exports.getMouseCoordsFromElement = getMouseCoordsFromElement;
    exports.getRendering = getRendering;
    exports.getScrollCoordsFromElement = getScrollCoordsFromElement;
    exports.isElementFullyVisible = isElementFullyVisible;
    exports.isElementFullyVisibleX = isElementFullyVisibleX;
    exports.isElementFullyVisibleY = isElementFullyVisibleY;
    exports.isElementHovered = isElementHovered;
    exports.isElementPartableVisible = isElementPartableVisible;
    exports.isElementPartableVisibleX = isElementPartableVisibleX;
    exports.isElementPartableVisibleY = isElementPartableVisibleY;
    exports.lerp = lerp;
    exports.removeFromRender = removeFromRender;
    exports.setToRender = setToRender;
    exports.startRender = startRender;
    exports.stopRender = stopRender;
    exports.subscribeMouse = subscribeMouse;
    exports.unsubscribeMouse = unsubscribeMouse;

}));
