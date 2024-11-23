require('dotenv').config()
const express = require('express');
const limit = require('express-rate-limit');
const  helmet = require('helmet');
const cors = require('cors')
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const authRoute = require("./routes/authRoute")
const app = express();


// helmet
app.use(helmet());
const limiter = limit ({
    max: '100',
    windowMs: 60 * 60 * 1000,
    message: 'Too many  request from this IP, try again in an hour'
});
app.use("/api", limiter);


// cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api",studentRoutes);
app.use("/api", courseRoutes);
app.use("/api", authRoute)


// 404 handler
app.use((req, res, next)=>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})



// setting up a server
app.listen(process.env.port || 4000, function () {
    console.log("Now listening for request on http://localhost:4000")
});