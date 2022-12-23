/**
 * @fileoverview lerp functions for tweening 2022
 * @version 1.0.0
**/

import { IEase } from "../interfaces/ease.interface"

const lerp = ( start: number, end: number, t = 0.075 ) => {
    return start + (end - start) * t
}

const Line = (t = 0.075) => {
    return t
}

const In = (t = 0.075) => {
    return pow(t)
}
const InCubic = (t = 0.075) => {
    return pow(t, 3)
}
const InQuartic = (t = 0.075) => {
    return pow(t, 4)
}
const InQuintic = (t = 0.075) => {
    return pow(t, 5)
}
const InCustom = (t = 0.075, strength = 5) => {
    return pow(t, strength)
}

const Out = (t = 0.075) => {
    return flip(pow(flip(t)))
}
const OutCubic = (t = 0.075) => {
    return flip(pow(flip(t), 3))
}
const OutQuartic = (t = 0.075) => {
    return flip(pow(flip(t), 4))
}
const OutQuintic = (t = 0.075) => {
    return flip(pow(flip(t), 5))
}
const OutCustom = (t = 0.075, strength = 5) => {
    return flip(pow(flip(t), strength))
}

const InOut = (t = 0.075) => {
    return lerp(In(t), Out(t), t)
}
const InOutCubic = (t = 0.075) => {
    return lerp(InCubic(t), OutCubic(t), t)
}
const InOutQuartic = (t = 0.075) => {
    return lerp(InQuartic(t), OutQuartic(t), t)
}
const InOutQuintic = (t = 0.075) => {
    return lerp(InQuintic(t), OutQuintic(t), t)
}
const InOutCustom = (t = 0.075, strengthIn = 5, strengthOut = 5) => {
    return lerp(InCustom(t, strengthIn), OutCustom(t, strengthOut), t)
}

const Ease: IEase = {
    Line,

    In,
    InCubic,
    InQuartic,
    InQuintic,
    InCustom,

    Out,
    OutCubic,
    OutQuartic,
    OutQuintic,
    OutCustom,

    InOut,
    InOutCubic,
    InOutQuartic,
    InOutQuintic,
    InOutCustom,
}

function pow(t: number, times = 2) {
    return Math.pow(t, times)
}
function flip(t: number) {
    return ( 1 - t )
}

export { lerp }
export default Ease