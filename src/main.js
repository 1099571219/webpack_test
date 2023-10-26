import arr from './js/ts1.js'
import './css/index.css'
import './css/index.sass'
import './css/index.scss'
import './css/index.less'
const env = import.meta.url //--fix
console.log(env)
console.log(arr?.([2, 2, 52]))
console.log(arr([1, 2, 3]))