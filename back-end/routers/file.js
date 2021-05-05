const express = require('express')

const router = express.Router();

const multer = require('multer')

const { exec } = require('child_process')

const path = require('path')

const { promisify } = require('util')

const execAsync = promisify(exec)

const fs = require("fs")



var name = ''

// function wait(ms, callback, ...args) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       callback(...args)
//       resolve(ms)
//     }, ms)
//   })
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../train_images/');
  },
  filename: (req, file, cb) => {
    name = Date.now() + '-' + file.originalname
    cb(null, name);
  }
})

/**
 * 文件数据解析
 */
const upload = multer({
  //文件名会随机,并且没有后置
  // dest:'./uploads/'
  //配置上传文件名
  storage
});


/**
 * file代表 文件上传时的 key值
 */
router.post('/', upload.single('file'), async function (req, res, next) {
  // const time = await wait(1000)
  // res.end(time)
  const cmd = 'python ../../main_parse_one.py ${name}'
  const result = await execAsync('ping baidu.com')
  console.log(result)
  res.end('hello world')
})

// router.post('/', upload.single('file'), (req, res, next) => {

//   let name_dir = path.resolve('./images/', name)
//   fs.exists(name_dir, function (exists) {
//     console.log(exists)
//     console.log(exists ? "创建成功" : "创建失败");
//   });
// })


module.exports = router