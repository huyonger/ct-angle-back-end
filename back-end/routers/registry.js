/**
 *   注册: post /login body {username: passwod:}
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
const statement1 = `select * from user where username = ?`

const statement2 = `insert into user VALUES(?,?)`


router.post('/', (req, res, next) => {
  const username=req.body.username
  const password=req.body.password
  connections.query(statement1, [username], (err, result, fields) => {
    console.log(result);
    if (err||result.length!==0) {
      res.end('false');
    } else {
      connections.query(statement2, [username,password], (err, result, fields) => {
        if(err){
          res.end('false');
        }else{
          res.end('true');
        }
      })
    }
  })
})

module.exports = router