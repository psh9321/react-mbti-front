import style from "@/css/home/animationWrapper/carouselBox/style.module.css"

interface PAGINATION {
    moveCallback : (i : number) => void,
    currentIdx : number,
}

export const Pagination = ({ moveCallback, currentIdx } : PAGINATION) => {

    return (
        <ol className={style.pagination}>
            <li onClick={() => moveCallback(0)} className={`${currentIdx === 0 && `${style.active}`}`}><button>한국 에서 <br/> 가장 많은 MBTI</button></li>
            <li onClick={() => moveCallback(1)} className={`${currentIdx === 1 && `${style.active}`}`}><button>전세계 에서 <br/> 가장 많은 MBTI</button></li>
            <li onClick={() => moveCallback(2)} className={`${currentIdx === 2 && `${style.active}`}`}><button>개발자 중 <br/> 가장 많은 MBTI</button></li>

            <li style={{
                left : `${currentIdx * 33.33}%`
            }} className={style.activeBar}></li>
        </ol>
    )
}