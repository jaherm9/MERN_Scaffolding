// Basic Lib input
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser")
const path = require("path")

// Security Middleware input
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp")
const xss = require("xss-clean")
const cors = require("cors")

// Database Middleware input
const mongoose = require("mongoose")

// Security Middleware implement
app.use(cors())
app.use(xss())
app.use(hpp())
app.use(mongoSanitize())
app.use(helmet())


//Body Parser implement
app.use(bodyParser.json())

//Request rate limit
const limiter = rateLimit({windowMs:15*60*1000, max:3000})
app.use(limiter)

// MongoDb Database connection

/*let URI = ""
let OPTIONS ={ user:"", pass: "", autoIndex:true}
mongoose.connect(URI, OPTIONS, (err)=>{
console.log("Connectoin Sucessful")
console.log(err)
})*/

// Front End Tagging
app.use(express.static('client/build'))
app.get("*", function (req, res){
    req.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.use("/api/v1", router)

module.exports = app