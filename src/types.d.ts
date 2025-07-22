/** component props */
export interface LAYOUT_CHILD {
    children : React.ReactNode,
};

/** 마우스/터치 타겟 이벤트 */
export type EVENT_TYPE = React.MouseEvent<HTMLElement> | React.TouchEvent<HeTMLElement>; 

/** 
 * mbti 검사 타입, 
 * energy : E, I 
 * recognition : S, N
 * judgment : T, F
 * life : J, P
 * */
export type MBTI_ELEMENTS_TYPE = "energy" | "recognition" | "judgment" | "life"

/**
 * 문항 체크 값 
 * 0 : 아니요, 1 : 예
 */
export interface DATA_INTER_FACE {
    [key : number] : 0 | 1
}

/**
 * 테스트 질문
 */
export interface QUESTION {
    type : MBTI_ELEMENTS_TYPE,
    contents : string
}

/** 
 * extraversion : 외향형
 * introversion : 내향형
 */
export type SUB_TYPE_TITLE = "extraversion" | "introversion";

/**
 * 하위 유형 타입
 * social : 사회적 (외향, 내향)
 * energetic : 활기찬 (외향)
 * expressive : 감정 표현형 (외향)
 * Cognitive : 지적 (외향)
 * thinking : 사색적 (내향)
 * anxious : 불안형 (내향)
 * restrained : 억제형 (내향)
 */
export type SUB_TYPE = "social" | "energetic" | "expressive" | "cognitive" | "thinking" | "anxious" | "restrained";

/** mbti 유형 */
export type MBTI_TYPE = "istj" | "isfj" | "infj" | "intj" | "istp" | "isfp" | "infp" | "intp" | "estp" | "esfp" | "enfp" | "entp" | "estj" | "esfj" | "enfj" | "entj"

/**
 * mbti 테스트 결과
 */
export interface MBTI_TYPE_INFO {
    /** mbti type */
    type : MBTI_TYPE, 
    /** 성격 */
    character : string, 
    /** 유형별 어울리는 색상 */
    color : string, 
    /** 설명 */
    contents : string, 
    /** 특징 */
    features : {title : string, contents : string}[], 
    /** 장점 */
    strength : string[], 
    /** 단점 */
    weakness : string[] 
}

/** 유형별 하위 유형 데이터 */
export interface SUB_PROPENSITY_ITEM {
    title: string;
    /** 하위 유형 핵심 */
    core: string; 
    /** 하위 유형 특징 */
    features: string[]; 
    /** ex */
    example: string; 
}

/** 유형별 하위 유형 원본 데이터 */
export interface SUB_PROPENSITY {
    [key as SUB_TYPE_TITLE] : SUB_PROPENSITY_DATA
}

/** 유형별 하위 유형 타입별 데이터 */
export interface SUB_PROPENSITY_DATA {
    [key as SUB_TYPE]? : SUB_PROPENSITY_ITEM
}