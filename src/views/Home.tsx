import style from "@/css/home/home.module.css"

import { MainBanner } from "@/component/Home/MainBanner/Index"
import { MbtiInfo } from "@/component/Home/MbtiInfo/Index"
import { AnimationWrapper } from "@/component/Home/AnimationWrapper/Index"

import { CopyRight } from "@/component/shared/CopyRight"

export const HomeView = () => {
    
    return (
        <section>
            <h2 className="hidden">인덱스</h2>          
            <div className={style.inner}>
                <MainBanner/>
                <MbtiInfo/>
                <AnimationWrapper/> 
            </div>
            <CopyRight/>
        </section>
    )
}