import style from "@/css/home/animationWrapper/style.module.css"

import { CarouseWrapper } from "./carousel/Wrapper"
import { AnimationBox } from "./AnimationBox/Index"

export const AnimationWrapper = () => {
    
    return (
        <article className={style.animationWrapper}>
            <h2 className="hidden">mbti rangking</h2>
            <AnimationBox/>
            <CarouseWrapper className={style.carouselBox}/>
        </article>  
    )    
}