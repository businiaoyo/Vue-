import { initMixin } from "./init"

function Vue(options){
    this._init(options)
}

initMixin(Vue) // 拓展了init方法 initMixin中在Vue的原型上添加了很多init函数

export default Vue