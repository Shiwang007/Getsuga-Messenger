const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const messageRoutes = require('./routes/message.routes')
const mongodbConnect = require("./db/connectToMongodb");
const { app, server } = require('./socket/socket');
// const cors = require('cors');

dotenv.config();

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/users", userRoutes)


server.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port ${process.env.PORT || 5000} `)
    mongodbConnect();
});