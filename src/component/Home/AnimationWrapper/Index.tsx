import { useRef } from "react"

import style from "@/css/home/animationWrapper/style.module.css"

import characteristics from "@/data/home/characteristics"

import { CarouseWrapper } from "./carousel/Wrapper"
import { Link } from "react-router-dom"

interface ACTIVE_TARGET_INFO {
    width : number,
    height : number
}

const ANIMATION_DURATION = 250;

export const AnimationWrapper = () => {
    
    const wrapperRef = useRef<HTMLUListElement>(null);

    const activeTargetInfo = useRef<ACTIVE_TARGET_INFO | null>(null);

    function ActiveAnimation(element: HTMLElement, endCallback : () => void) {

        if(!wrapperRef["current"]) return

        const startTime = performance.now();

        const wrapper = wrapperRef["current"];

        const startWidth = element.clientWidth;
        const startHeight = element.clientHeight;
        

        const directionX = element.dataset.directionX as "left" | "right";
        const directionY =element.dataset.directionY as "top" | "bottom";

        element.style.position = "absolute";
        element.style[directionX] = "0";
        element.style[directionY] = "0";
        element.style.zIndex = "5";
    
        function step(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1); // 0 ~ 1 사이
    
            const newWidth = startWidth + (wrapper.clientWidth - startWidth) * progress;
            const newHeight = startHeight + (wrapper.clientHeight - startHeight) * progress;

            element.style.width =  `${newWidth}px`;
            element.style.height = `${newHeight}px`
    
            if (progress < 1) {
                requestAnimationFrame(step);
            }
            else {
                if(endCallback) endCallback();
            }
        }
    
        requestAnimationFrame(step);
    }    

    function UnActiveAnimation(element : HTMLElement, endCallback : () => void){
        if(!activeTargetInfo["current"]) return 

        const startTime = performance.now();

        const startWidth = element.clientWidth;
        const startHeight = element.clientHeight;

        const { width, height } = activeTargetInfo["current"];
        
        function step(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
    
            const newWidth = startWidth - (startWidth - width) * progress;
            const newHeight = startHeight - (startHeight - height) * progress;

            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`
    
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // 애니메이션 종료 후 깔끔하게 맞추기
                element.style.width = `${width}px`;
                element.style.position = "relative";
                element.style.zIndex = "auto";

                if(endCallback) endCallback();
            }
        }
    
        requestAnimationFrame(step);
    }

    function ClickCallback(e : React.MouseEvent<HTMLLIElement>){
 
        const target = e.currentTarget;

        const card = target.querySelector(`.${style.inner}`) as HTMLDivElement;

        if(activeTargetInfo["current"]) {
            card.setAttribute("class",`${style.inner}`);
            UnActiveAnimation(card, () => {
                activeTargetInfo["current"] = null;
                card.style.width = "100%";
            })
        }
        else {
            activeTargetInfo["current"] = {
                width : card.clientWidth,
                height : card.clientHeight
            }
                
            ActiveAnimation(card, () => {
                card.setAttribute("class",`${style.inner} ${style.active}`);
            });
        }
    }

    return (
        <article className={style.animationWrapper}>
            <h2 className="hidden">mbti rangking</h2>
            <div className={style.animationBox}>
                <ul ref={wrapperRef} className={style.animationItemList}>
                    {
                        characteristics.map((el, i) => {
                            return (
                                <li 
                                    key={`${el["title"]}-${i}`}
                                    onClick={ClickCallback}
                                >
                                    <div 
                                        data-direction-x={i%2 ? "right" : "left"} 
                                        data-direction-y={i > 1 ? "bottom" : "top"}
                                        className={style.inner}
                                    >
                                        <div className={style.frontItem}>
                                            <img src={`/home/${el["img"]}`} alt={el["title"]} />
                                            <h3>{el["title"]}</h3>
                                        </div>
                                        <dl className={style.backItem}>
                                            <dt>{el["title"]}</dt>
                                            { el["contents"].map(txt => <dd key={`${txt}-${i}`}>{txt}</dd>) }
                                        </dl>
                                    </div>
                                </li>
                            )
                        })
                    }
                    <li>
                    <Link to="/test">
                        <img src="/home/test.png" alt="MBTI 검사 페이지로 이동" />
                        MBTI 검사
                    </Link>
                    </li>
                </ul>
            </div>
            <CarouseWrapper className={style.carouselBox}/>
        </article>  
    )    
}