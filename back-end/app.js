const express = require('express')
const loginRouter = require('./routers/login');
const registryRouter = require('./routers/registry');
const fileRouter = require('./routers/file')
const cors = require('cors');

const app = express();

app.use(express.static('../prd_result'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRouter)
app.use("/registry", registryRouter)
app.use("/file", fileRouter)

app.get('/', (req, res, next) => {
    res.end('hello world')
})

app.listen(8000, () => {
    console.log('服务器启动......')
})