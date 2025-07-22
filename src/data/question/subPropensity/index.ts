import social from "./common/social"

import cognitive from "./extraversion/cognitive"
import energetic from "./extraversion/energetic"
import expressive from "./extraversion/expressive"

import anxious from "./introversion/anxious"
import restrained from "./introversion/restrained"
import thinking from "./introversion/thinking"


export default {
    /** 외향형 */
    extraversion : [
        /** 외향형 */
    ...cognitive,
    ...energetic,
    ...expressive,
    ...social,
    ],

    introversion : [
        /** 내향형 */
        ...anxious,
        ...restrained,
        ...thinking,
        ...social,
    ]
}