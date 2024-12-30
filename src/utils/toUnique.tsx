export const toUnique = (data1: any[], data2: any[]) => {
    return [ ...new Set([ ...data1, ...data2 ]) ]
}
