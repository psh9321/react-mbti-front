import style from "@/css/home/mbtiInfo/style.module.css"

export const MbtiInfo = () => {
    return (
        <article className={style.mbtiInfoBox}>
            <h2 className="hidden">MBTI 정보</h2>
            <dl>
                <dt>MBTI (Myers-Briggs Type Indicator)</dt>
                <dd>MBTI는 자기 이해, 대인 관계 개선, 팀워크 향상, 진로 탐색 등 <br/> 다양한 분야에서 활용될 수 있습니다.</dd>
            </dl>
            <img src="/home/mbti_indicator.jpg" alt="" />
        </article>
    )
}