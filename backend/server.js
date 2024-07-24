const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const messageRoutes = require('./routes/message.routes')
const mongodbConnect = require("./db/connectToMongodb");


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)


app.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port ${process.env.PORT || 5000} `)
    mongodbConnect();
});