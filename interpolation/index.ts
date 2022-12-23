/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Interpolation 2022
 * @version 0.2.0.beta
**/

import { piecewise } from "./piecewise"

interface IFunctions {
    piecewise: Function
}

const functions: IFunctions = {
    piecewise
}

const interpolation = (config, time) => {
    // todo: make api for different functions
    const calc = functions.piecewise

    const timeline = config.timeline
    const tInterface = config.interface

    if ( timeline.length < 2 ) { return console.error('[interpolation]: Minimum count of points "2"') }
    fillInterface()
    return tInterface

    function fillInterface() {
        for ( let key in tInterface ) {
            const times = tInterface[key].$TIME
            if ( time < times.at(0) ) {
                calc(key, [times.at(0)], tInterface, timeline, time)
            } else
            if ( time >= times.at(-1) ) {
                calc(key, [times.at(-1)], tInterface, timeline, time)
            } else {
                for ( let i = 0; i < times.length - 1; i++ ) {
                    if ( time >= times.at(i) && time < times.at(i + 1) ) {
                        calc(key, [times.at(i), times.at(i+1)], tInterface, timeline, time)
                    }
                }
            }
        }
    }
}


export { interpolation, IFunctions }