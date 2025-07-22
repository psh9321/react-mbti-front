import { useEffect, useState } from "react";
import { useShallow } from 'zustand/shallow';
import { Link, useNavigate } from "react-router-dom";

import style from "@/css/test/testInfo.module.css"

import { MBTI_ELEMENTS_TYPE } from "@/types"

import { useTestStore } from "@/store/useTestStore"

import { ToastPopup } from "../Toast.TestClose";



export const MbtiInfo = () => {
    const { mbtiData, SetMbti } = useTestStore(useShallow(state => ({
        mbtiData : state.mbtiData,
        SetMbti : state.SetMbti
    })));

    const [isComplete, setIsComplete] = useState(false);

    const [isToast, setIsToast] = useState(false);

    const navigation = useNavigate();

    function GetMbtiType(type : MBTI_ELEMENTS_TYPE) : string{

        const targetType = mbtiData[type];
        
        const calcTargetType = Object.values(targetType).reduce((acc, val) => {
            acc[String(val)]+=1;
    
            return acc
        },{"0": 0, "1" : 0});

        const result = Number(Object.keys(calcTargetType).reduce((a,b) => calcTargetType[a] > calcTargetType[b] ? a : b))

        switch (type) {
            case "energy": return result > 0 ? "E" : "I"; 
            case "recognition" : return result > 0 ? "S" : "N"; 
            case "judgment" : return result > 0 ? "T" : "F";
            case "life" : return result > 0 ? "J" : "P";
        }
    }

    function Submit(){
        const e_i = GetMbtiType("energy");
        const s_n = GetMbtiType("recognition");
        const t_f = GetMbtiType("judgment");
        const j_p = GetMbtiType("life");

        SetMbti(`${e_i}${s_n}${t_f}${j_p}`);
    }

    function NaviCallback(e : React.MouseEvent<HTMLAnchorElement>){

        for(const item of Object.values(mbtiData)) {
            if(Object.values(item).length > 0) {
                e.preventDefault();
                return setIsToast(true);
            }
        }
    }

    useEffect(() => {

        for(const key in mbtiData) {
            if(Object.keys(mbtiData[key as MBTI_ELEMENTS_TYPE]).length < 7) {
                if(isComplete) setIsComplete(false);
                return 
            }
        }

        setIsComplete(true);

    },[mbtiData])

    return (
        <>
            { isToast && <ToastPopup cancelCallback={() => {
                setIsToast(false)
            }} submitCallback={() => {
                navigation("/");
            }} /> }
            

            <dl className={style.testTitle} >
                <dt>MBTI 검사</dt>
                <dd>
                    여러분의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
                </dd>
                <dd>
                    여러분의 성격 유형이 삶의 다양한 영역에 어떤 영향을 미치는지 알아보세요.
                </dd>
                <dd>
                    
                </dd>
                <dd>
                    <ul className={style.btnList}>
                        <li><Link onClick={NaviCallback} to={"/"}>홈으로</Link></li>
                        {
                            isComplete && <li><button onClick={Submit}> 다음</button></li>
                        }
                    </ul>
                </dd>
            </dl>        
        </>

    )
}