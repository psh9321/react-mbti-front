import { useRef, useState } from "react";

import style from "@/css/home/animationWrapper/carouselBox/style.module.css"

import { EVENT_TYPE } from "@/types"

import { EventTarget } from "@/util/common";

import { DeveloperRankingTable, GlobalRanKingTable, KoreanRanKingTable } from "./tableBox/Table"
import { Pagination } from "./Pagination";
import { SourcesBox } from "./SourcesBox";

interface EVENT_PARAMS {
    x : number,
    y : number
}

interface CAROUSEL_POSITION_INFO {
    element : HTMLUListElement | null,
    startPosition : EVENT_PARAMS | null, 
    endPosition : EVENT_PARAMS | null,
    isDown : boolean, 
    left : number, 
}

const TRANSITION_TIME = 0.25;

export const CarouseWrapper = ({className} : {className : string}) => {

    const [ currentIdx, setCurrentIdx ] = useState(0);

    const [maxIdx] = useState(2);

    const positionInfo = useRef<CAROUSEL_POSITION_INFO>({
        element : null,
        isDown : false,
        startPosition : {x : -1, y : -1},
        endPosition : {x : -1, y : -1},
        left : 0,
    });

    function Down(e : EVENT_TYPE) {
        
        const params = EventTarget(e);
        
        if((params["y"]-100) < 50) return

        positionInfo["current"]["isDown"] = true;

        positionInfo["current"]["endPosition"] = null;

        positionInfo["current"]["startPosition"] = params;
    }

    function Move(e : EVENT_TYPE) {

        if(!positionInfo["current"]["isDown"]) return
        
        const { x, y } = EventTarget(e);

        const startX = positionInfo["current"]["startPosition"]?.["x"] as number;
        const startY = positionInfo["current"]["startPosition"]?.["y"] as number;

        positionInfo["current"]["endPosition"] = { x, y };

        /** 최소 움직임 */
        if(Math.abs(startX - x) <= 5 && Math.abs(startY - y) <= 5) return

        /** 현재 x 좌표 */
        const endX = positionInfo["current"]["endPosition"]["x"];

        /** 0보다 크면 오른쪽에서 왼쪽, 0보다 작으면 왼쪽에서 오른쪽 */
        const distance : number = startX - endX;

        const { element, left } = positionInfo["current"]
        
        const inner = element as HTMLUListElement;
        
        /** 오른쪽에서 왼쪽으로 스와이프 하면서 맨마지막 슬라이드 일때 */
        if(distance > 0 && currentIdx >= maxIdx) {
            inner.style.left = `-${inner.clientWidth*(maxIdx)}px`
            
        }
        /** 왼쪽에서 오른?쪽으로 스와이프 하면서 맨 처음 슬라이드 일때 */
        else if(distance <= 0 && currentIdx === 0){
            inner.style.left = `0px`;
        }
        else {
            inner.style.left = `${(endX - startX) + left}px`
        }
        
    }
    
    function Up(e : EVENT_TYPE) {
        if(!positionInfo["current"]["isDown"]) return
        if(!positionInfo["current"]["startPosition"] || !positionInfo["current"]["endPosition"]) return;

        positionInfo["current"]["isDown"] = false;

        const startY = positionInfo["current"]["startPosition"]["y"];
        const startX = positionInfo["current"]["startPosition"]["x"];
        const endY = positionInfo["current"]["endPosition"]["y"];
        const endX = positionInfo["current"]["endPosition"]["x"];

        if(Math.abs(startX - endX) <= 5 && Math.abs(startY - endY) <= 5) {
            positionInfo["current"]["isDown"] = false;
            positionInfo["current"]["startPosition"] = null;
            positionInfo["current"]["endPosition"] = null;

            return
        }

        const distance = startX - endX;

        if(Math.abs(endX - startX) > (e.currentTarget.clientWidth / 3)) {
            /** 오른쪽에서 왼쪽으로 스와이프 */
            if (distance > 0) {
                if(currentIdx >= maxIdx) return
                MoveCallback(currentIdx+1)
            }
            /** 왼쪽에서 오른쪽으로 스와이프 */
            else {
                if(currentIdx === 0) return;
                MoveCallback(currentIdx-1)
            }

        }

        e.currentTarget.style.left = `${positionInfo["current"]["left"]}px`

        positionInfo["current"]["isDown"] = false;
        positionInfo["current"]["startPosition"] = null;
        positionInfo["current"]["endPosition"] = null;

    }

    function TransitionEnd(e : React.TransitionEvent<HTMLUListElement>){
        const target = e.target as HTMLElement;
        target.style.transition = "none";
    }

    function MoveCallback(i : number){
        const elements = positionInfo["current"]["element"] as HTMLUListElement;

        elements.style.transition = `${TRANSITION_TIME}s`;

        positionInfo["current"]["left"] = -(elements.clientWidth * i);        

        elements.style.left = `${positionInfo["current"]["left"]}px`;       
        
        setCurrentIdx(i);
    }
    return (
        <div className={className??""}>
            <Pagination currentIdx={currentIdx} moveCallback={MoveCallback}/>
            <div className={style.inner}>
                <ul
                    ref={el => {
                        if(el) positionInfo["current"]["element"] = el
                    }}
                    onMouseDown={Down}
                    onMouseMove={Move}
                    onMouseUp={Up}
                    onMouseOut={Up}
                    onTouchStart={Down}
                    onTouchMove={Move}
                    onTouchEnd={Up}
                    onTouchCancel={Up}
                    onTransitionEnd={TransitionEnd}
                    className={style.carouselList}
                >
                    <li>
                        <KoreanRanKingTable/>
                    </li>
                    <li>
                        <DeveloperRankingTable/>
                    </li>
                    <li>
                        <GlobalRanKingTable/>
                    </li>
                </ul>
            </div>
            <SourcesBox currentIdx={currentIdx} />
        </div>
    )
}