/**
 * @name checklogin
 * @description 检查用户是否登录的中间件
 * @author Sky
 */

 /*验证*/
  module.exports = function AuthMiddleware(req, res, next) {
     var token = req.session.token;
       if (!token) {
         req.session.page = req.url;
         return res.redirect('/login');
       }else{
     		return next();
     	}
 }
 
