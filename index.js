const express = require('express')
const urlRoute = require('./routes/url')
const connectDB = require('./Config/conDB')
const path = require('path')
const staticRoute = require('./routes/staticRouter')
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser")
const { checkForAuthentication } = require("./middlewares/auth")
require('dotenv').config()

const app = express()

connectDB(process.env.MONGO_URL).then(() => console.log('MongoDB connected'))

const Port = 4000

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use(express.static(__dirname + '/public'));

app.use('/', staticRoute)
app.use('/user', userRoute)
app.use('/url', urlRoute)

app.listen(Port, ()=> console.log(`server started at ${Port}`))