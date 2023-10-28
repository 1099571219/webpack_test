export const add = (x, y) => {
    return [x, y].reduce((pre, cur) => pre + cur, 0)
}

export const mul = (x, y) => {
    return [x, y].reduce((pre, cur) => pre * cur, 0)
}
