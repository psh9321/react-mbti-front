import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useShallow } from 'zustand/shallow';

import style from "@/css/test/testBox.module.css"

import { QUESTION, SUB_TYPE } from "@/types"

import { FadeAnimation } from "@/util/common";

import subPropensityData from "@/data/question/subPropensity/index"

import { useTestStore } from "@/store/useTestStore"

import { SubPropensityCheckList } from "./CheckList";

export const SubPropensityBox = () => {

    const { mbti } = useTestStore(useShallow(state => ({
        mbti : state.mbti,
    })));

    const [ data, setData ] = useState<QUESTION[]>([]);

    const ref = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        const _data = subPropensityData[mbti[0] === "E" ? "extraversion" : "introversion"] as QUESTION[];

        setData(_data.sort(() => Math.random() - 0.5));
    },[]);

    useEffect(() => {
        if(!ref["current"]) return
        if(ref["current"].querySelectorAll("li").length <= 0) return

        const liArr = ref["current"].querySelectorAll("li");

        const observe = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    FadeAnimation("in",entry.target as HTMLLIElement, 250);
                }
                else {
                    FadeAnimation("out",entry.target as HTMLLIElement, 250);
                }
            })
        }, {
            threshold : 0.5
        })
        
        liArr.forEach(li => observe.observe(li));

        return () => {
            liArr.forEach(li => observe.unobserve(li));
            observe.disconnect();
        }
    },[data])
    
    return (
        <>
            <h2 className="hidden">하위 성향 검사</h2>
            <ul ref={ref} className={style.questionList}>
                {
                    data.map((el, i) => {
                        return (
                            <li key={`${el["contents"]}-${i}`}>
                                <h3>{el["contents"]}</h3>
                                <SubPropensityCheckList type={el["type"] as SUB_TYPE} idx={i}/>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}