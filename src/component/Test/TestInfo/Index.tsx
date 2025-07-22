import { useEffect } from "react";
import { useShallow } from 'zustand/shallow';

import { useTestStore } from "@/store/useTestStore"

import { MbtiInfo } from "./MbtiInfo";
import { SubPropensityInfo } from "./SubPropensityInfo";

export const TestInfo = () => {

    const { mbti, unInit } = useTestStore(useShallow(state => ({
        mbti : state.mbti,
        unInit : state.unInit
    })));

    useEffect(() => {
        return () => {
            unInit()
        }
    },[])

    return (
        <>
            { mbti ? <SubPropensityInfo/> : <MbtiInfo/> }
        </>
    )
}