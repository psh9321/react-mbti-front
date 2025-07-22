import style from "@/css/home/animationWrapper/carouselBox/style.module.css"

const arr = ["테스트 모아", "16Personalities", "Reddit, StackOverflow, HackerNews, Dev.to"];

export const SourcesBox = ({ currentIdx } : { currentIdx : number }) => {

    return (
        <div className={style.sourcesBox}>
            <h3>
                출처 : {arr[currentIdx]}
            </h3>
        </div>
    )
}