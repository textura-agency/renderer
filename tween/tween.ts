/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Light optimised tween 2022
 * @version 1.0.0
**/

import Ease, { lerp } from "./easing"

const Tween = {
    to(from, to, { duration = 1000, renderDelay = 0, delay = 0, onChange = (context) => {}, onComplete = (context) => {}, ease = Ease.InOut }) {
        const MainStartTime = performance.now()
        let startTime = MainStartTime
        let complete = false
        const saveDelay = delay
        requestAnimationFrame(function render( time ) {
            const t = {
                hole: (time - MainStartTime) / ( duration + saveDelay ),
                nothole: (time - ( MainStartTime + saveDelay )) / duration
            }
            let value = {}
            complete = (t.hole >= 1.0)
            if ( time - startTime > renderDelay && time - startTime > delay ) {
                delay = 0
                startTime = performance.now()
                
                if (typeof from === 'number') {
                    value = lerp(from, to, ease(t.nothole))
                } else {
                    deepObject(from, to, value, t.nothole)
                }
                onChange({ value, state: t })
            }
            if ( complete ) { onComplete({ value, state: t }) }
            if ( !complete ) { requestAnimationFrame(render) }
        })

        function deepObject(from, to, value, t) {
            Object.keys(from).forEach(key => {
                if (typeof from[key] === 'number') {
                    value[key] = lerp(from[key], to[key], ease(t))
                } else {
                    value[key] = {}
                    deepObject(from[key], to[key], value[key], t)
                }
            })
        } 
    },
}

export default Tween