import { EVENT_TYPE } from "../types"

export function EventTarget(e: EVENT_TYPE) : { x : number, y : number} {
    let x : undefined | number = undefined;
    let y : undefined | number = undefined;

    if ("touches" in e && e.touches && e.touches.length > 0){
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
    }
    else if ("changedTouches" in e && e.changedTouches && e.changedTouches.length > 0){
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
    }
    else {
        const mouseEvent = e as React.MouseEvent<HTMLButtonElement>;

        x = mouseEvent.pageX;
        y = mouseEvent.pageY;
    }

    return {
        x : x,
        y : y
    }
}