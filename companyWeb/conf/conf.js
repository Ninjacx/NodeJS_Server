var mysql = require('mysql');
// 使用连接池，提升性能


// MySQL连接池数据库联接配置

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test',
    port: 3306
});

var selectSQL = 'select * from test_city limit 10';




// function sql(sql){
  pool.getConnection(function (err, conn) {
      if (err) console.log("POOL ==> " + err);
      conn.query(selectSQL,function(err,res){
          if (err) console.log(err);
          // for (var i in res) {
          //     console.log(res[i]);
          // }
          console.log(res);
          conn.release();
          // return res;
      });
  });
// }


// console.log(sql(selectSQL));
