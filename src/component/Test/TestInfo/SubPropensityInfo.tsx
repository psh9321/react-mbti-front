import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShallow } from 'zustand/shallow';

import style from "@/css/test/testInfo.module.css"

import { SUB_TYPE } from "@/types"

import { useTestStore } from "@/store/useTestStore"

import { ToastPopup } from "../Toast.TestClose";

import { TestLoadingView } from "@/component/shared/loadingView/TestLoadingView";

export const SubPropensityInfo = () => {

    const { subPropensityData, mbti } = useTestStore(useShallow(state => ({
        subPropensityData : state.subPropensityData,
        mbti : state.mbti
    })));

    const [naviLink, setNaviLink] = useState("");

    const [isComplete, setIsComplete] = useState(false);

    const [isToast, setIsToast] = useState(false);

    const navigation = useNavigate();

    function Submit(){
        const obj = {} as { [key in SUB_TYPE] : number };

        for(const [key, valueObj] of Object.entries(subPropensityData)) {

            if(Object.keys(valueObj).length <= 0) continue
            
            const a = Object.values(valueObj).filter(el => el > 0).length;

            if(a <= 0) continue

            obj[key as SUB_TYPE] = a;
            
        }

        /** '예' 를 많이 체크한 하위성향의 '예' 체크 수 */
        const maxCount = Math.max(...Object.values(obj));

        const result = [];

        for(const key in obj) {
            if(obj[key as SUB_TYPE] < maxCount) continue

            result.push(key)
        }

        setNaviLink(`/result/${mbti.toLocaleLowerCase()}/${result.length > 0 ?`?sub=${btoa(result.join("-"))}`  : ""}`)
    }

    function LoadingViewCallback(){
        navigation(naviLink);
    }

    function NaviCallback(e : React.MouseEvent<HTMLAnchorElement>){

        for(const item of Object.values(subPropensityData)) {
            if(Object.values(item).length > 0) {
                e.preventDefault();
                return setIsToast(true);
            }
        }
    }

    useEffect(() => {
        for(const key in subPropensityData) {

            if(mbti[0] === "E") {
                if(key === "thinking") continue
                if(key === "anxious") continue
                if(key === "restrained") continue
            }

            if(mbti[0] === "I") {
                if(key === "energetic") continue
                if(key === "expressive") continue
                if(key === "cognitive") continue
            }

            
            if(Object.keys(subPropensityData[key as SUB_TYPE]).length < 7) {
                if(isComplete) setIsComplete(false);
                return 
            }
        }
        
        setIsComplete(true);
    },[subPropensityData])

    return (
        <>
            { isToast && <ToastPopup cancelCallback={() => {
                setIsToast(false)
            }} submitCallback={() => {
                navigation("/");
            }} /> }

            {
                naviLink && <TestLoadingView naviCallback={LoadingViewCallback}/>
            }
            

            <dl className={style.testTitle}>
                <dt>MBTI 하위 유형 검사</dt>
                <dd>
                    이 테스트는 성격심리학자 조나단 칙의 이론에 기반하여, <br/> 내향성과 외향성의 하위 유형을 탐색합니다.
                </dd>
                <dd>
                    자신을 더 깊이 이해하고, 대인관계, 직업, <br/> 삶의 방식에 어떤 영향이 있는지 확인해보세요.
                </dd>
                <dd>
                    <ul className={style.btnList}>
                        <li><Link onClick={NaviCallback} to={"/"}>홈으로</Link></li>
                        {
                            isComplete && <li><button onClick={Submit}>제출하기</button></li>
                        }
                    </ul>
                </dd>
            </dl>        
        </>
    )
}