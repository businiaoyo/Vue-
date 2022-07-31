import { observe } from "./observe/index";

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    // 原型中的this，指向都是实例
    let vm = this;
    vm.$options = options;

    initState(vm);
  };
  Vue.prototype.xxx = function(){
    
  }

}
function initState(vm){
    const opts = vm.$options;
    if(opts.data){
        initData(vm);
    }
}
function proxy(vm, target, key){
    Object.defineProperty(vm, key, {
        get(){
            // 更深度的对象，比如deepSchool，将其绑定到vm上之后，对deepSchool的深度访问其实就是对_data中的deepSchool的深度访问，不必再另行绑定
            return vm[target][key] 
        },
    })
}
function initData(vm){
   let data = vm.$options.data;
   // 函数 或者 对象
   data = typeof data === 'function'? data.call(vm) : data
   console.log("this", data);
   // options中只有下划线data, 需要将劫持后的data绑到_data上。 这里是浅拷贝（拷贝了引用），对data的操作相当于对_data的操作
   vm._data = data;
   // 劫持数据 defineProperty
   observe(data);
   // 将_data中的属性绑定到vm示例上
   for(let key in data){
      proxy(vm, '_data', key);
   }
   console.log("vm", vm);
}