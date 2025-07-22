import { useEffect, useLayoutEffect, useRef, useState } from "react";

import mbtiTypeData from "@/data/question/mbti/index";

import style from "@/css/test/testBox.module.css"

import { QUESTION, MBTI_ELEMENTS_TYPE } from "@/types"
import { FadeAnimation, GetRandomItems } from "@/util/common";

import { CheckList } from "./CheckList";

export const MbtiBox = () => {

    const [data, setData] = useState<QUESTION[]>([]);

    const ref = useRef<HTMLUListElement>(null);
    
    useLayoutEffect(() => {

        const arr = [];

        for(const type in mbtiTypeData) {
            const key = type as MBTI_ELEMENTS_TYPE;
            const targetData = mbtiTypeData[key] as QUESTION[];

            arr.push(GetRandomItems(targetData, 7));
        }

        const parseArr = arr.flat();

        const result = GetRandomItems(parseArr, parseArr.length);

        setData(result);

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
            <h2 className="hidden">mbti 검사</h2>

            <ul ref={ref} className={style.questionList}>
                {
                    data.map((el, i) => 
                    {
                        return (
                            <li key={`${el["contents"]}-${i}`}>
                                <h3>{el["contents"]}</h3>
                                <CheckList item={el as QUESTION} idx={i} />
                            </li>
                        ) 
                    }) 
                }
            </ul>
        </>
    )
}