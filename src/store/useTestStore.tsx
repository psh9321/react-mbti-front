import { create } from "zustand"

import { MBTI_ELEMENTS_TYPE, SUB_TYPE, DATA_INTER_FACE } from "@/types"

interface TEST_STORE {
    mbti : string,
    mbtiData : {
        [key in MBTI_ELEMENTS_TYPE] : DATA_INTER_FACE
    },
    
    subPropensityData : {
        [key in SUB_TYPE] : DATA_INTER_FACE
    },
    
    setMbtiData : ( type : MBTI_ELEMENTS_TYPE, idx : number, value : 0 | 1 ) => void,
    setSubTypeData : (type : SUB_TYPE, idx : number, value : 0 | 1) => void,
    SetMbti : (result : string) => void,

    unInit : () => void
}

const mbtiDataModel = {
    energy : {},
    recognition : {},
    judgment : {},
    life : {}
}

const subPropensityDataModel = {
    social : {},
    energetic : {},
    expressive : {},
    cognitive : {},
    thinking : {},  
    anxious : {},  
    restrained : {},
}

export const useTestStore = create<TEST_STORE>(( set ) => ({
    mbti : "",
    mbtiData : {...mbtiDataModel},

    subPropensityData : {...subPropensityDataModel},

    setMbtiData(type, idx, value){
        set(state => ({
            mbtiData: {
              ...state.mbtiData, /** 기존 mbtiData 객체를 얕은 복사 (불변성 유지) */
              [type]: { /** 해당 type 키의 객체를 새로 만듦 */
                ...state.mbtiData[type], /** 기존 type 객체도 얕은 복사
                */
                [idx]: value, /** idx 키의 값을 새로 할당 또는 덮어쓰기 */
              }
            }
        }))
    },

    setSubTypeData(type, idx, value){
        set(state => ({
            subPropensityData: {
              ...state.subPropensityData, /** 기존 subPropensityData 객체를 얕은 복사 (불변성 유지) */
              [type]: { /** 해당 type 키의 객체를 새로 만듦 */
                ...state.subPropensityData[type], /** 기존 type 객체도 얕은 복사
                */
                [idx]: value, /** idx 키의 값을 새로 할당 또는 덮어쓰기 */
              }
            }
        }))
    },

    SetMbti(result){ set({ mbti : result }) },

    unInit(){

        set(state => {
            const newObj = {...state};

            if(newObj["mbti"]) newObj["mbti"] = "";

            newObj["mbtiData"] = mbtiDataModel;
            newObj["subPropensityData"] = subPropensityDataModel;

            return newObj

        })
    }
}))
