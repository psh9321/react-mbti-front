import koreanData from "@/data/home/typeRanking/korean"
import globalData from "@/data/home/typeRanking/global"
import developerData from "@/data/home/typeRanking/developer"

interface RANGKING_DATA {
    ranking : string,
    type : string,
    contents : string
}

const TableData = ({ data } : { data : RANGKING_DATA[] } ) => {

    return (
        <>
            {
                data.map(el => {
                    return (
                        <tr key={`global-${el["type"]}-${el["ranking"]}`}>
                            <td>{el["ranking"]}</td>
                            <td>{el["type"]}</td>
                            <td className="test">{el["contents"]}</td>
                        </tr>  
                    )
                })
            }   
        </>
    )
}

export const KoreanRanKingTable = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th>순위</th>
                    <th>MBTI 유형</th>
                    <th>대략적 비율 (%)</th>
                </tr>
            </thead>
            <tbody>
                <TableData data={koreanData} />
            </tbody>
        </table>
    )
}

export const GlobalRanKingTable = () => {
    return (
        <table>
            <thead>
            <tr>
                <th>순위</th>
                <th>MBTI 유형</th>
                <th>대략적 비율 (%)</th>
            </tr>
            </thead>
            <tbody>
                <TableData data={globalData} />
            </tbody>
        </table>
    )
}

export const DeveloperRankingTable = () => {
    return (
        <table>
            <thead>
            <tr>
                <th>순위</th>
                <th>MBTI 유형</th>
                <th>선호 영역</th>
            </tr>
            </thead>
            <tbody>
                <TableData data={developerData} />
            </tbody>
        </table>
    )
}