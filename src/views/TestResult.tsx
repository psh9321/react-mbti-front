import { useEffect, useState } from "react";

import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom"

import mbtiInfo from "@/data/mbtiType/type";
import subPropensityInfo from "@/data/mbtiType/subPropensityInfo";

import style from "@/css/result/style.module.css"

import { MBTI_TYPE_INFO, MBTI_TYPE, SUB_PROPENSITY_ITEM, SUB_PROPENSITY_DATA, SUB_TYPE, SUB_TYPE_TITLE, SUB_PROPENSITY } from "@/types"

import { CopyRight } from "@/component/shared/CopyRight";
import { AnimationWrapper } from "@/component/shared/AnimationWrapper";

const mbtiArr : MBTI_TYPE[] = ["istj", "isfj", "infj", "intj", "istp", "isfp", "infp", "intp", "estp", "esfp", "enfp", "entp", "estj", "esfj", "enfj", "entj"];

const subPropensityArr : SUB_TYPE[] = ["social", "energetic", "expressive", "cognitive", "thinking", "anxious", "restrained"];

export const TestResultView = () => {
    
    const { mbti } = useParams();

    const [ searchParams ] = useSearchParams();

    const navigation = useNavigate();

    const [data, setData] = useState<MBTI_TYPE_INFO | null>(null);

    const [subPropensity ,setSubPropensity] = useState<SUB_PROPENSITY_ITEM[]>([]);

    const [subPropensityType, setSubPropensityType] = useState("");

    const subData : SUB_PROPENSITY = subPropensityInfo;

    const mbtiData = mbtiInfo as { [key in MBTI_TYPE] : MBTI_TYPE_INFO }
    
    useEffect(() => {

        if(!mbtiArr.includes(mbti as MBTI_TYPE)) {
            navigation("/error"); 
            return
        }
        
        if(searchParams.get("sub")) {

            const sub = searchParams.get("sub");

            const parseValue = atob(sub as string);

            const subType = (mbti as MBTI_TYPE)[0] === "e" ? "extraversion" : "introversion" as SUB_TYPE_TITLE;
    
            const subPropensityData = subData[subType as keyof SUB_PROPENSITY_DATA];
    
            const subValueArr = parseValue.split("-") as SUB_TYPE[];
            
            if(subValueArr.length > 0) {
                const isInvalid = subValueArr.every(el => subPropensityArr.includes(el as SUB_TYPE));

                if(!isInvalid) {
                    navigation("/error");
                    return 
                }
            }

            for(const key of subValueArr) {
                const _key = key as SUB_TYPE;
                setSubPropensity(arr => {
                    const newArr = [...arr];
                    
                    newArr.push(subPropensityData[_key])
    
                    return newArr
                })
            }
    
            
    
            setSubPropensityType(subValueArr.length > 1 ? `복합형 ${(mbti as MBTI_TYPE)[0] === "e" ? "외향성" : "내향성"}` : (subPropensityData[subValueArr[0]] as SUB_PROPENSITY_ITEM).title)
        }
        
        setData(mbtiData[mbti as MBTI_TYPE]);
    },[])
    
    
    if(!data) return <></>
    
    return (
        <AnimationWrapper>
            <section id={style.mbti}>
                <h2 className="hidden">검사 결과 : {mbti}</h2>    
                <div className={style.inner}>            
                    <article className={style.mbtiBanner} style={{
                        borderBottom : `5px solid ${data["color"]}`
                    }}>
                        <h2 className="hidden">{mbti} 정보</h2>
                        <Link className={style.btnHome} to="/">홈으로</Link>
                        <div className={style.imgBox}>
                            <img src={`/mbti/${mbti}.webp`} alt="" />
                        </div>
                        <dl className={style.txtBox}>
                            <dt>{mbti} {subPropensityType && <span>({subPropensityType})</span>}</dt>
                            <dd className={style.subType}>{data["character"]}</dd>
                            <dd className={style.contents}>{data["contents"]}</dd>
                        </dl>
                    </article>
                    <article className={style.infoContents}>
                        <h2 className="hidden">{mbti} 특징, 장/단점</h2>
                        <div>
                            {
                                subPropensityType && 
                                <div className={`${style.infoBox} ${style.subPropensityContents}`}>
                                    <h3 style={{
                                        borderBottom : `5px solid ${data["color"]}`
                                        }}>하위유형 : {subPropensityType}</h3>
                                    <ul className={style.subResultList}>
                                        {
                                            subPropensity.map((el, i) => {
                                                
                                                return (
                                                    <li key={el["title"] + i}>
                                                        <dl>
                                                            <dt>{el["title"]}</dt>
                                                            <dd>
                                                                - {el["core"]}
                                                            </dd>
                                                            <dd>
                                                                <ul className="list">
                                                                    {
                                                                        el["features"].map(item => {
                                                                            return (
                                                                                <li key={item}>
                                                                                    {item}
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </dd>
                                                        </dl>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                            <div className={`${style.infoBox} ${style.featuresBox}`}>
                                <h3 style={{
                                    borderBottom : `5px solid ${data["color"]}`
                                    }}>{mbti} 특징</h3>
                                <ul className={style.featuresList}>
                                    {
                                        data["features"].map(el => {
                                            return (
                                                <li key={el["title"]}>
                                                    <dl>
                                                        <dt>{el["title"]}</dt>
                                                        <dd>{el["contents"]}</dd>
                                                    </dl>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className={`${style.infoBox} ${style.strengthBox}`}>
                                <h3 style={{
                                    borderBottom : `5px solid ${data["color"]}`
                                    }}>
                                    {mbti} 의 장점
                                </h3>
                                <ul>
                                    {
                                        data["strength"].map(el => <li key={el}>{el}</li>)
                                    }
                                </ul>
                            </div>
                            <div className={`${style.infoBox} ${style.weaknessBox}`}>
                                <h3 style={{
                                    borderBottom : `5px solid ${data["color"]}`
                                    }}>{mbti} 의 단점</h3>
                                <ul>
                                    {
                                        data["weakness"].map(el => <li key={el}>{el}</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <CopyRight/>
            {/* {mbti} {atob(subPropensity as string)} */}
        </AnimationWrapper>
    )
}