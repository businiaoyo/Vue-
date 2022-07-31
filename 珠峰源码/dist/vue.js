(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(data) {
      _classCallCheck(this, Observe);

      this.walk(data);
    }

    _createClass(Observe, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observe;
  }();

  function defineReactive(target, key, value) {
    observe(value);
    Object.defineProperty(target, key, {
      get: function get() {
        console.log('get...');
        return value;
      },
      set: function set(newValue) {
        console.log('set...');
        if (newValue === value) return;
        value = newValue;
      }
    });
  }
  function observe(data) {
    if (_typeof(data) !== 'object' || data == null) {
      return;
    }

    return new Observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // 原型中的this，指向都是实例
      var vm = this;
      vm.$options = options;
      initState(vm);
    };

    Vue.prototype.xxx = function () {};
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }
  }

  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        // 更深度的对象，比如deepSchool，将其绑定到vm上之后，对deepSchool的深度访问其实就是对_data中的deepSchool的深度访问，不必再另行绑定
        return vm[target][key];
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data; // 函数 或者 对象

    data = typeof data === 'function' ? data.call(vm) : data;
    console.log("this", data); // options中只有下划线data, 需要将劫持后的data绑到_data上。 这里是浅拷贝（拷贝了引用），对data的操作相当于对_data的操作

    vm._data = data; // 劫持数据 defineProperty

    observe(data); // 将_data中的属性绑定到vm示例上

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    console.log("vm", vm);
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue); // 拓展了init方法 initMixin中在Vue的原型上添加了很多init函数

  return Vue;

}));
//# sourceMappingURL=vue.js.map
