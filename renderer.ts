/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Render loop 2021
 * @version 1.0.0
**/

const Renderer = {
    handlers: [],
    isRendering: false,
}

const stopRender = function() {
    this.isRendering = false
}.bind(Renderer)

const startRender = function() {
    this.isRendering = true
    requestAnimationFrame(function render(time) {
        if (!this.isRendering) { return }
        this.handlers.forEach((item) => item.rendering(time))
        requestAnimationFrame(render.bind(Renderer))
    }.bind(Renderer))
}.bind(Renderer)

const setToRender = function({ label, handler, delay }) {
    const newLabel = label || this.handlers.length
    if (!handler) { console.error(`Renderer: Handler for render is required. Handler label "${newLabel}"`); return }
    if (typeof handler !== "function") { console.error(`Renderer: Invalid type of handler, required Function. Handler label "${newLabel}"`); return }

    this.handlers.push({
        handler,
        label: newLabel,
        delay: delay || 10,
        startTime: performance.now(),
        rendering(time) {
            if (time - this.startTime >= this.delay) {
                this.startTime = performance.now()
                this.handler(time)
            }
        },
    })
}.bind(Renderer)

const removeFromRender = function(label = 'removeLastFromRender') {
    let isRequested = 0
    if (label === 'removeLastFromRender') {this.handlers = this.handlers.slice(0, this.handlers.length - 1); return }
    this.handlers = this.handlers.filter((item) => {
        if (item.label !== label) {
            return true
        }
        isRequested++
        return false
    })
    if (isRequested === 0) { console.warn(`Renderer: No handlers with label "${label}" in rendering`) }
}.bind(Renderer)

const getRendering = function() {
    return this.handlers
}.bind(Renderer)

export { 
    stopRender,
    startRender,
    setToRender,
    removeFromRender,
    getRendering
}
