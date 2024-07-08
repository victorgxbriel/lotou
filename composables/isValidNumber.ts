

export default function(number:string, loteria: Loteria) {
    const num = parseInt(number)
    if(isNaN(num) || num <= 0 || num > loteria.variacaoNum){
        return false
    }
    return true
}