import style from "@/css/test/toast.module.css"

export const ToastPopup = ({cancelCallback, submitCallback} : {cancelCallback : () => void, submitCallback : () => void}) => {
    return (
        <div id={style.toast}>
            <dl>
                <dt>진행된 테스트 내용은 저장 되지 않습니다.</dt>
                <dd>테스트를 종료 하시겠습니까?</dd>
                <dd>
                    <ul>
                        <li><button onClick={submitCallback}>테스트 종료</button></li>
                        <li><button onClick={cancelCallback}>계속 하기</button></li>
                    </ul>
                </dd>
            </dl>
        </div>
    )
}