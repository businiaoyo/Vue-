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
      // ????????????this?????????????????????
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
        // ???????????????????????????deepSchool??????????????????vm???????????????deepSchool??????????????????????????????_data??????deepSchool???????????????????????????????????????
        return vm[target][key];
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data; // ?????? ?????? ??????

    data = typeof data === 'function' ? data.call(vm) : data;
    console.log("this", data); // options??????????????????data, ?????????????????????data??????_data?????? ?????????????????????????????????????????????data?????????????????????_data?????????

    vm._data = data; // ???????????? defineProperty

    observe(data); // ???_data?????????????????????vm?????????

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    console.log("vm", vm);
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue); // ?????????init?????? initMixin??????Vue???????????????????????????init??????

  return Vue;

}));
//# sourceMappingURL=vue.js.map
