/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Interpolation 2022
 * @version 0.2.1.beta
**/
import { IInterpolationFunctions, IInterpolationConfig, IInterpolationTimeline, IInterpolationInterface } from "../interfaces/interpolation.interface"
import { piecewise } from "./piecewise"

const functions: IInterpolationFunctions = {
    piecewise
}

const getInterpolated = (config: IInterpolationConfig, time: number) => {
    // todo: make api for different functions
    const calc = functions.piecewise

    const timeline: any = config.timeline
    const tInterface: IInterpolationInterface = config.interface

    if ( timeline.length < 2 ) { return console.error('[interpolation]: Minimum count of points "2"') }
    fillInterface()
    return tInterface

    function fillInterface() {
        for ( let key in tInterface ) {
            const times = tInterface[key].$TIME
            if ( times.length < 2 ) { return console.error('[interpolation]: Minimum count children in $TIME: [] in interpolationInterfce "2"') }
            if ( time < times[0] ) {
                calc(key, [times[0]], tInterface, timeline, time)
            } else
            if ( time >= times[times.length - 1] ) {
                calc(key, [times[times.length - 1]], tInterface, timeline, time)
            } else {
                for ( let i = 0; i < times.length - 1; i++ ) {
                    if ( time >= times[i] && time < times[i + 1] ) {
                        calc(key, [times[i], times[i+1]], tInterface, timeline, time)
                    }
                }
            }
        }
    }
}

export { getInterpolated }