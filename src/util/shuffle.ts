import { QUESTION } from "@/types"

export function FisherYatesShuffle(arr : QUESTION[]) {
    const result = [...arr];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}
  
export function GetRandomItems(arr  : QUESTION[], length : number) {
    const shuffled = FisherYatesShuffle(arr);

    return shuffled.slice(0, length);
}