import { useRef } from "react";
import { Pencil } from 'lucide-react';

import style from "@/css/test/testBox.module.css"

import { MbtiBox } from "./Mbti/Index";
import { SubPropensityBox } from "./SubPropensity/Index";

import { EventTarget } from "@/util/common";
import { useTestStore } from "@/store/useTestStore";

export const TestBox = () => {

    const mouseIconRef = useRef<HTMLDivElement>(null);
    
    const mbti = useTestStore(state => state.mbti);

    function MouseMoveCallback(e : React.MouseEvent<HTMLDivElement>){
        if(!mouseIconRef["current"]) return

        const mouseIcon = mouseIconRef["current"];

        const { x, y } = EventTarget(e);

        const target = e.target as HTMLElement;

        mouseIcon.style.visibility = target.closest("[data-btn]") ? "hidden" : "visible";

        const svg = mouseIcon.querySelector("svg");
        
        if(svg) {
            svg.style.stroke = target.closest("label") ? "#3d8bf2" : ""
            svg.style.fill = target.closest("label") ? "#3d8bf2" : ""
        }

        const { top, left, width, height } = mouseIcon.getBoundingClientRect();

        mouseIcon.style.top = `${(mouseIcon.offsetTop + (y - top))-(width/2) - scrollY}px`;
        mouseIcon.style.left = `${(mouseIcon.offsetLeft + (x - left))-(height/2) - scrollX}px`;
    }

    return (
        <article className={style.testContents} onMouseMove={MouseMoveCallback}>
            <div ref={mouseIconRef} className={style.mouseIcon}>
                <Pencil/>
            </div>
            {mbti ? <SubPropensityBox/> : <MbtiBox/>}
        </article>
    )
}