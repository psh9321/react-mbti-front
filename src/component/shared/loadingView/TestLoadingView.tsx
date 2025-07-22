
import { useEffect, useRef } from "react"

import { FadeAnimation } from "@/util/common";

export const TestLoadingView = ({ naviCallback } : { naviCallback : () => void }) => {

    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if(!ref["current"]) return 

        const p = ref["current"];

        const words = p.textContent?.split(" ");

        p.innerHTML = words?.map(word => `<span style="opacity : 0">${word}</span>`).join(" ") as string;

        const spanArr = p.querySelectorAll("span");

        spanArr.forEach((el, i) => {
            const timer =  setTimeout(() => {
                FadeAnimation("in",el, 250, true, () => {
                    if(i === spanArr.length-1) {
                        if(naviCallback) naviCallback();
                    }
                });
                clearTimeout(timer);
            }, i * 200);
        })

        
    },[])

    return (
        <div
            style={{
                position: "fixed",
                top : "0",
                left : "0",
                width:"100%",
                height : "100dvh",
                zIndex:"99",
                backgroundColor:"#F6D064",
            }}
        >
            <p 
                ref={ref}
                style={{
                    position: "fixed",
                    top : "50%",
                    left : "50%",
                    transform : "translate(-50%, -50%)",
                    fontSize : "3rem"
                }}
            >나의 성격 유형은?
            </p>
        </div>
    )
}