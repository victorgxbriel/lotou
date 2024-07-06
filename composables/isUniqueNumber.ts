import type { NumberProps } from "~/components/number.vue";


export default function(num: string, list: NumberProps[]): boolean{
    return !list.some(n => n.num === num)
}