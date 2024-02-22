const timestampToTime = timestamp => {
    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + "-";
    let M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    let h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    let m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  };
  /**
   * 存储localStorage
   */
  const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  };
  
  /**
   * 获取localStorage
   */
  const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
  };
  
  /**
   * 删除localStorage
   */
  const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
  };
  //验证码生成
  const createCode = name => {
    let code = "";
    let codeLength = 4; //验证码的长度
    let random = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ]; //随机数
    for (let i = 0; i < codeLength; i++) {
      //循环操作
      let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
      code += random[index]; //根据索引取得随机数加到code上
    }
    return code; //把code值赋给验证码
  };
  /**
   * 设置cookie
   **/
  function setCookie(name, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + "=" + value + ";expires=" + date;
  }
  
  /**
   * 获取cookie
   **/
  function getCookie(name) {
    let reg = RegExp(name + "=([^;]+)");
    let arr = document.cookie.match(reg);
    if (arr) {
      return arr[1];
    } else {
      return "";
    }
  }
  
  /**
   * 删除cookie
   **/
  function delCookie(name) {
    setCookie(name, null, -1);
  }
  
  /**
   * 导出
   **/
  export {
    timestampToTime,
    setStore,
    getStore,
    removeStore,
    setCookie,
    getCookie,
    delCookie,
    createCode
  };