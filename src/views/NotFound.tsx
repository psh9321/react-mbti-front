import { Link } from "react-router-dom"

import style from "@/css/notFound/notFound.module.css"

export const NotFoundView = () => {

    
    return (
        <dl className={style.notFound}>
            <dt>ERROR 404</dt>
            <dd>존재 하지않는 페이지 입니다.</dd>
            <dd>
                <Link to={"/"}>홈으로</Link>            
            </dd>
        </dl>
    )
}