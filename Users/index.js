const express = require('express');
const cors = require('cors');
const userRouter = require("./routes/userRoute")
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');
require('dotenv').config()

const app = express()

var corsOptions = {
    origin: "http://127.0.0.1:3000"
}


//middleware

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cookieParser(jwtSecret));

//router
app.use('/auth/', userRouter)


//port
const PORT = process.env.PORT || 3000

//server
app.listen(PORT, () => 
    console.log(`users API listening on port ${PORT}`)
);