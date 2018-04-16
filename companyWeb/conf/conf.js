var mysql = require('mysql');
// 使用连接池，提升性能


// MySQL连接池数据库联接配置

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
    port: 3306
});

var selectSQL = 'select * from n_user limit 10';

// function sql(sql){
function query(sql,callback){
  pool.getConnection(function (err, connection){
      if (err) console.log("POOL ==> " + err);
      connection.query(sql,function(err,res){
          if (err) console.log(err);
          callback(err,res);
          connection.release();
          // return res;
      });
  });
}
//module.
exports.query=query;

// exports.query(selectSQL,function(err,res){
//   console.log(res);
// });


// console.log(sql(selectSQL));
