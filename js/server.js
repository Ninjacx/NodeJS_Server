//服务
const http = require('http');
const fs = require('fs');//文件
const url = require('url');//解析地址

http.createServer(function(req,res){
    let {pathname,query} = url.parse(req.url,true);

    fs.readFile(`../www/${req.url}`,function(err,data){
      console.log(`www${req.url}`);
        if(!err){
          res.write(data);
        }else{
        // res.write(data);
        res.writeHeader(404);
        }
        res.end();
    });
}).listen('81'); 
