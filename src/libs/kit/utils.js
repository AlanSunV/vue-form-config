// import * as API from '../../api';
import * as g from '../global';

export default {
  // 一下方法已经加入到工具类库中,在此只作为实例.
  setSessionData: (k, v) => {
    sessionStorage.setItem(k, JSON.stringify(v));
  },
  getSessionData: (k) => {
    let v = sessionStorage.getItem(k);
    if (v === null || v === undefined || v === 'null' || v === 'undefined') {
      v = '';
      return v;
    }
    return JSON.parse(v);
  },
  getChange: (k, v) => v && v !== '' ? ('&' + k + '=' + v) : '',
  // 第一个get请求转换
  getChange1: (k, v) => v && v !== '' ? ('?' + k + '=' + v) : '',
  // 时间转换
  dateChange: (data) => {
    const y = data.getFullYear();
    let m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = data.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  },
  // 时间转换
  dateChangeMonth: (data) => {
    data = new Date(data);
    const y = data.getFullYear();
    let m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    return y + '-' + m + '-01';
  },
  dateChangeMonth1: (data) => {
    data = new Date(data);
    const y = data.getFullYear();
    let m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    return y + '-' + m;
  },
  // 数据库时间转换
  dateInChange: (data) => {
    const y = data.getFullYear();
    let m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = data.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d + 'T00:00:00.000Z';
  },
  // 身份证校验
  checkPersonId: (str) => {
    // trace(str)
    if (str === null || str === '') {
      return false;
    }
    var exp1 = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; // 中国居民身份证验证
    var exp = /(^(H|M)\d{10}$)/; // 港澳通行证验证
    if (exp1.test(str) === false && exp.test(str) === false) {
      return false;
    } else if (str.length === 18) {
      var iSs = 0;
      var iY = 0;
      var szVerCode = '10X98765432';
      var iw = [];
      iw[0] = 7;
      iw[1] = 9;
      iw[2] = 10;
      iw[3] = 5;
      iw[4] = 8;
      iw[5] = 4;
      iw[6] = 2;
      iw[7] = 1;
      iw[8] = 6;
      iw[9] = 3;
      iw[10] = 7;
      iw[11] = 9;
      iw[12] = 10;
      iw[13] = 5;
      iw[14] = 8;
      iw[15] = 4;
      iw[16] = 2;
      for (let i = 0; i < 17; i++) {
        iSs += iw[i] * (str.substr(i, 1) - '0');
      }
      iY = iSs % 11;
      var eChr = str.substr(17, 1);
      var vChr = szVerCode.substr(iY, 1);
      if (eChr === vChr) {
        return true;
      } else {
        return false;
      }
    } else {
      // 15位 未增加算法验证
      return true;
    }
  },

  // 根据id获取地区数据的该项
  getAreaItem: ($obj, $id) => {
    for (var a in $obj) {
      if (typeof ($obj[a]) === 'object') {
        var ro = g.utils.getAreaItem($obj[a], $id); // 递归遍历
        if (ro !== undefined) {
          return ro;
        }
      } else {
        if (a === 'value' && $obj[a] === $id) {
          return $obj;
        }
      }
    }
  },

  // 遍历公共数据
  forObj: ($obj, $value) => {
    for (const $item of $obj) {
      if ($item.value === $value) {
        return $item;
      }
    }
  },

  // 防抖
  throttle: (callback, time) => {
    const that = this;
    this.throttleInstance = this.throttleInstance || null;
    time = time || 600;

    if (this.throttleInstance) {
      window.clearTimeout(this.throttleInstance);
    }

    this.throttleInstance = window.setTimeout(function () {
      callback.call(that);
    }, time);
  },
  // 时间转换
  time: (value) => {
    if (value) {
      let out = '';
      const date = new Date(value);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      hour = hour < 10 ? ('0' + hour) : hour;
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      out = y + '-' + m + '-' + d + ' ' + hour + ':' + minute + ':' + second;
      return out;
    }
  },
  date: (value) => {
    if (value) {
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        return value.replace(/\./g, '-');
      } else {
        let out = '';
        const date = new Date(value);
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        out = y + '-' + m + '-' + d;
        return out;
      }
    }
  },
  // 获取ago当前日期
  getToday: (ago) => {
    ago = ago || -1;
    var _time = new Date(Date.now() + ago * 24 * 60 * 60 * 1000);
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '-' + pad((_time.getMonth() + 1), 2) + '-' + pad(_time.getDate(), 2);
  },
  // 获取ago当前日期   年月日
  getToday2: (ago) => {
    ago = ago || 0;
    var _time = new Date(Date.now() + ago * 24 * 60 * 60 * 1000);
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '年' + pad((_time.getMonth() + 1), 2) + '月' + pad(_time.getDate(), 2) + '日';
  },
  // 获取前几个月的日期
  getAMonthAgo: (yue) => {
    var date = new Date();
    date.setMonth(date.getMonth() - yue * 1);
    var _time = new Date(date.getTime());
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '-' + pad((_time.getMonth() + 1), 2) + '-' + pad(_time.getDate(), 2);
  },
  // 获取前几天的日期
  getDayAgo: (day) => {
    var _time = new Date(Date.now() - (day) * 24 * 60 * 60 * 1000);
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '-' + pad((_time.getMonth() + 1), 2) + '-' + pad(_time.getDate(), 2);
  },
  trace() {
  },

  jugeType(obj) {
    const getType = Object.prototype.toString;
    return getType.call(obj);
  },

  isArr(target) {
    return this.jugeType(target) === '[object Array]';
  },

  isObj(target) {
    return this.jugeType(target) === '[object Object]';
  },

  isString(target) {
    return this.jugeType(target) === '[object String]';
  },

  isNumber(target) {
    return this.jugeType(target) === '[object Number]';
  },

  isBoolean(target) {
    return this.jugeType(target) === '[object Boolean]';
  },

  isUndefined(target) {
    return this.jugeType(target) === '[object Undefined]';
  },

  isNull(target) {
    return this.jugeType(target) === '[object Null]';
  },

  /**
     * 对象深拷贝
     */
  deepClone(data) {
    let obj;
    if (this.isArr(data)) {
      obj = [];
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]));
      }
    } else if (this.isObj(data)) {
      obj = {};
      for (const key in data) {
        obj[key] = this.deepClone(data[key]);
      }
    } else {
      // 不再具有下一层次
      return data;
    }
    return obj;
  },

  /**
     * 获取深层次的数组
     * keyName需要为a.b.c 对应data[a][b][c]
     */
  getDeepArr(data, keyName) {
    if (isUndefined(keyName) || isNull(keyName)) {
      // 没有对象数组键名
      // 直接返回data数组
      if (this.isArr(data)) return data
      throwError("the data is not an Array, please provide the keyName to match correct Array");
    } else {
      const keyList = keyName.split(',')
      let value = data
      for (const iterator of keyList) {
        if (!value.hasOwnProperty(iterator) || isUndefined(value)) {
          throwError("please check the keyName's level")
        }
        value = value[iterator]
      }
      if (this.isArr(value)) return value
      throwError("the data is not an Array, please provide the keyName to match correct Array");
    }
  },

  throwError(msg) {
    throw new ReferenceError(msg);
  },
  traversalObject($data, $fn) {
    for (const key in $data) {
      if ($data.hasOwnProperty(key)) {
        const item = $data[key];
        if (
          Object.prototype.toString.call(item) === "[object Object]"
        ) {
          this.traversalObject(item, $fn);
        } else {
          $fn && $fn(key, item);
        }
      }
    }
  },
  expandKeys($data) {
    const newObj = {};
    this.traversalObject($data, (key, value) => {
      newObj[key] = value;
    })
    return newObj
  },
  cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
      {
        parent: root,
        key: undefined,
        data: x
      }
    ];

    while (loopList.length) {
      // 深度优先
      const node = loopList.pop();
      const parent = node.parent;
      const key = node.key;
      const data = node.data;

      // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
      let res = parent;
      if (typeof key !== "undefined") {
        res = parent[key] = {};
      }

      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          if (typeof data[k] === "object") {
            // 下一次循环
            loopList.push({
              parent: res,
              key: k,
              data: data[k]
            });
          } else {
            root[k] = data[k];
          }
        }
      }
    }

    return root;
  }
};
