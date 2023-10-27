import add from './js/ts1.js'
import * as math from './js/math.js'
import './css/index.css'
import './css/index.sass'
import './css/index.scss'
import './css/index.less'
const env = import.meta.url //--fix
// console.log(env)
console.log(add(1, 2))
console.log(math.mul(2, 5))