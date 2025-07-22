import style from "@/css/home/mainBanner/mainBanner.module.css"
import { Link } from "react-router-dom"

export const MainBanner = () => {
    
    return (
        <article className={style.banner}>
            <h2 className="hidden">banner</h2>
            <dl className={style.mainTxt}>
                <dt>MBTI</dt>
                <dd>심리 이론에 기반한 성격 분석.</dd>
                <dd>더 깊이 있는 나를 알아가는 시간.</dd>
                <dd>전문적인 MBTI 검사, 무료 제공.</dd>
                <dd><Link to={"/test"}>mbti 검사</Link></dd>
            </dl>
            <img src="/home/mbti_animal.jpg" alt="MBTI 심리 이론에 기반한 성격 분석. 더 깊이 있는 나를 알아가는 시간. 전문적인 MBTI 검사, 무료 제공." className={style.bannerImg}/>
        </article>
    )
}