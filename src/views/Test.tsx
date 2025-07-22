import style from "@/css/test/test.module.css"

import { TestInfo } from "@/component/Test/TestInfo/Index"
import { TestBox } from "@/component/Test/TestBox/Index"

export const TestView = () => {
    
    return (
        <>

            <section id={style.testBox}>
                <h2 className="hidden">성격 유형 검사</h2>
                <TestInfo/>
                <TestBox/>
            </section>        
        </>

    )
}