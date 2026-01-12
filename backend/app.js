const express = require('express');
const morgan = require('morgan');
const path = require('path')
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
const ftpRouter = require('./routes/ftp.routes')
const loginRouter = require('./routes/login.routes')
const os = require('os');
const ip = Object.values(os.networkInterfaces())
.flat().find((i) => i.family === 'IPv4' && !i.internal).address;
const dotenv = require('dotenv')
dotenv.config();
const connectToDB = require('./config/db')
connectToDB()
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", 'ejs')
app.use(express.static("public"))
app.use('/',userRouter)
app.use('/',indexRouter)
app.use('/',ftpRouter)
app.use('/',loginRouter)
app.use("/uploads", // only upload folder is expose as public hai
  express.static(path.join(__dirname, "public/data/uploads"))
);

app.listen(port,'0.0.0.0',()=>{
    console.log(`\nServer is running at: \n${process.env.VITE_BACKEND_URL} or \nhttp://${ip}:3000`)
})