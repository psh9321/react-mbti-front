import { useEffect, useRef } from "react"

import { LAYOUT_CHILD } from "@/types"

export const AnimationWrapper = ({ children } : LAYOUT_CHILD) => {

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if(!wrapperRef["current"]) return 

        const start = performance.now();

        const duration = 250;

        const AnimationCallback = (time : number) => {

            if(!wrapperRef["current"]) return

            const calcTime = time - start;
            const progress = Math.min(calcTime / duration, 1);

            wrapperRef["current"].style.opacity = `${progress}`;

            if(progress < 1) {
                requestAnimationFrame(AnimationCallback)
            }
        }

        requestAnimationFrame(AnimationCallback)

    },[])

    return (
        <div style={{opacity : 0}} ref={wrapperRef}>
            {children}
        </div>
    )
}