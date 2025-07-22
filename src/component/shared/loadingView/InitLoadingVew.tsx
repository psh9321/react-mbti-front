import React, { useEffect, useRef, useState } from "react"

import { FadeAnimation } from "@/util/common";

export const InitLoadingView = () => {

    const loadingViewRef = useRef<HTMLDivElement>(null);

    const [progressHeight, setProgressHieght] = useState(0);
    const [progressWidth, setProgressWidth] = useState(5);

    function TransitionEnd(e : React.TransitionEvent){
        if(e.propertyName !== "width") return 
        if(!loadingViewRef["current"]) return
        
        const loadingView = loadingViewRef["current"];

        if(progressWidth === 100) {
            FadeAnimation("out", loadingView, 250, false, () => {
                loadingView.remove()
            })
        }
    }

    useEffect(() => {

        setProgressHieght(10);

        const timer = setInterval(() => {
            setProgressHieght(value => {
                if(value >= 100) {
                    setProgressWidth(100);
                    clearInterval(timer);
                    return 100    
                }
                else {
                    return value+=40
                }
            })
            
        },800);

        return () => clearInterval(timer);
    },[])

    return (
        <div 
            ref={loadingViewRef}
            style={{
                position: "fixed",
                top : "0",
                left : "0",
                width:"100%",
                height : "100%",
                zIndex:"5",
                backgroundColor:"#F6D064",
            }}
            >
            <div 
                style={{
                    position: "fixed",
                    top : "50%",
                    left : "50%",
                    transform: "translate(-50%, -50%)",
                    width:`${progressWidth}%`,
                    height : `${progressHeight}%`,
                    backgroundColor:"#FDF8E6",
                    borderRadius : progressHeight < 100 ? "10px" : "0",
                    transition : "0.25s ease",
                    zIndex:"5",
                }}
                onTransitionEnd={TransitionEnd}
            ></div>
        </div>
    )
}