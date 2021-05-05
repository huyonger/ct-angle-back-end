/**
 *   登录: post /login body {username: passwod:}
 */
const express = require('express')

const router = express.Router();

const mysql = require('mysql2')

// 1.创建数据库连接池
const connections = mysql.createPool({
  host: 'rm-bp1077d66oh9p817d7o.mysql.rds.aliyuncs.com',
  port: 3306,
  database: 'hospital',
  user: 'huyong',
  password: 'HuYong19993530',
  connectionLimit: 10
});

// 2.查询数据库
const statement = `select * from user where username = ?`

router.post('/',(req,res,next)=>{
  const username=req.body.username
  connections.query(statement, [username], (err, result, fields) => {
    if(err){
      res.end('false');
    }else{
      res.end('true');
    }
  })
})

module.exports=router