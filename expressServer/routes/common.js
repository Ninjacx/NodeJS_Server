/**
 * @name checklogin
 * @description 检查用户是否登录的中间件
 * @author Sky
 */

 /*验证*/
 let common = {
   isNull: function(data) {
      // instanceof Array
      //字符串是否为空
      if(typeof(data)==="string"){
         return Boolean(data.replace(/(^\s*)|(\s*$)/g, ""));
      }else{
        // 数组 循环是否有空值 空直接返回
      }
      // else if(){
      //
      // }
        // if(data.replace(/(^\s*)|(\s*$)/g, "")){
        //
        // }
    }
 }


  module.exports = common;
