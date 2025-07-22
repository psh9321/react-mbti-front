import { useShallow } from 'zustand/shallow';
import { SquareCheckBig, Square } from 'lucide-react';
import { useTestStore } from '@/store/useTestStore';

import { SUB_TYPE } from "@/types"

import style from "@/css/test/testBox.module.css"

interface PROPS {
    type : SUB_TYPE,
    idx : number
}

export const SubPropensityCheckList = ({ type, idx} : PROPS) => {

    const { setSubTypeData, subPropensityData } = useTestStore(useShallow(state => ({
        setSubTypeData : state.setSubTypeData,
        subPropensityData : state.subPropensityData

    })));

    function CheckCallback(e : React.ChangeEvent<HTMLInputElement>){
        const self = e.currentTarget;

        const li = self.parentElement;

        li?.scrollIntoView({
            behavior : "smooth",
            block : "start"
        })

        const value = Number(self.value) as (0 | 1);

        setSubTypeData(type, idx, value);
    }

    return (
        <ul className={style.checkList}>
            <li>
                <label 
                    htmlFor={`${type}_${idx}_yes`}
                    className={`${subPropensityData[type][idx] === 1 && style.on}`}
                >
                    {subPropensityData[type][idx] === 1 ? <SquareCheckBig/> : <Square/> }
                    예
                </label>
                <input 
                    checked={subPropensityData[type][idx] === 1} 
                    hidden 
                    type="checkbox" 
                    id={`${type}_${idx}_yes`} 
                    defaultValue={1} 
                    onChange={CheckCallback} 
                />
            </li>
            <li>

            <label 
                htmlFor={`${type}_${idx}_no`} 
                className={`${subPropensityData[type][idx] === 0 && style.on}`}
            >
                {subPropensityData[type][idx] === 0 ? <SquareCheckBig/> : <Square/> }
                아니요
            </label>
            <input 
                hidden 
                type="checkbox" 
                id={`${type}_${idx}_no`} 
                checked={subPropensityData[type][idx] === 0} 
                defaultValue={0} 
                onChange={CheckCallback}
            />
            </li>
        </ul>
        
    )
}