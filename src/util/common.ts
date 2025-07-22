import { QUESTION, EVENT_TYPE } from "@/types"

export function FisherYatesShuffle(arr : QUESTION[]) {
    const result = [...arr];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}
  
export function GetRandomItems(arr  : QUESTION[], length : number) {
    const shuffled = FisherYatesShuffle(arr);

    return shuffled.slice(0, length);
}

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

export function FadeAnimation(type : "in" | "out", element : HTMLElement ,duration : number, isScale : boolean = true, callback? : () => void){
    const start = performance.now();

    const AnimCallback = (time : number) => {
        const calcTime = time - start;
        const progress = Math.min(calcTime / duration, 1)

        const resultValue = type === "in" ? `${progress}` : `${1 - progress}`;
        
        element.style.opacity = resultValue;
        
        if(isScale) {
            element.style.transform = `scale(${resultValue})`;
        }
        

        if(progress < 1) {
            requestAnimationFrame(AnimCallback)
        }
        else {
            if(callback) callback()
        }
    }
    requestAnimationFrame(AnimCallback)
}