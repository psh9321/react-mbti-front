import { useTestStore } from '@/store/useTestStore';
import { SquareCheckBig, Square } from 'lucide-react';

import { QUESTION } from "@/types"

import style from "@/css/test/testBox.module.css"

interface CHECK_LIST {
    item : QUESTION,
    idx : number,
}

export const CheckList = ({ item, idx } : CHECK_LIST) => {

    const { setMbtiData, mbtiData } = useTestStore();

    function CheckCallback(e : React.ChangeEvent<HTMLInputElement>){
        const self = e.currentTarget;

        const li = self.parentElement;

        li?.scrollIntoView({
            behavior : "smooth",
            block : "start"
        })

        const value = Number(self.value) as (0 | 1);

        setMbtiData(item["type"], idx,value)
    }

    return (
        <ul className={style.checkList}>
            <li>

                <label className={`${mbtiData[item["type"]][idx] === 1 && style.on}`} htmlFor={`${item["type"]}_${idx}_yes`}>
                    {mbtiData[item["type"]][idx] === 1 ? <SquareCheckBig/> : <Square/> }
                    예
                </label>
                <input 
                    checked={mbtiData[item["type"]][idx] === 1} 
                    hidden 
                    type="checkbox" 
                    id={`${item["type"]}_${idx}_yes`} 
                    defaultValue={1} 
                    onChange={CheckCallback} 
                />
            </li>
            <li>
                <label className={`${mbtiData[item["type"]][idx] === 0 && style.on}`} htmlFor={`${item["type"]}_${idx}_no`}>
                {mbtiData[item["type"]][idx] === 0 ? <SquareCheckBig/> : <Square/> }
                    아니요
                </label>
                <input 
                    checked={mbtiData[item["type"]][idx] === 0} 
                    hidden 
                    type="checkbox" 
                    id={`${item["type"]}_${idx}_no`} 
                    defaultValue={0} 
                    onChange={CheckCallback} 
                />
            </li>
        </ul>
    )
}