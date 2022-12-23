/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Render loop 2021
 * @version 1.0.0
**/
import { IRenderer, IRendererHandler, IRendererProps } from "./interfaces/renderer.interface"

const Renderer: IRenderer = {
    handlers: [],
    isRendering: false,
}

const stopRender = function(this: IRenderer) {
    this.isRendering = false
}.bind(Renderer)

const startRender = function(this: IRenderer) {
    this.isRendering = true
    requestAnimationFrame(function render(this: IRenderer, time: number) {
        if (!this.isRendering) { return }
        this.handlers.forEach((item) => item.rendering(time))
        requestAnimationFrame(render.bind(Renderer))
    }.bind(Renderer))
}.bind(Renderer)

const setToRender = function(this: IRenderer, { label, handler, delay }: IRendererProps) {
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
    } as IRendererHandler)
}.bind(Renderer)

const removeFromRender = function(this: IRenderer, label = 'removeLastFromRender') {
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

const getRendering = function(this: IRenderer) {
    return this.handlers
}.bind(Renderer)

export { 
    stopRender,
    startRender,
    setToRender,
    removeFromRender,
    getRendering
}
