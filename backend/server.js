const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const messageRoutes = require('./routes/message.routes')
const mongodbConnect = require("./db/connectToMongodb");
const { app, server } = require('./socket/socket');
const path = require('path');

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../",  "frontend", "dist", "index.html"));
})

server.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port ${process.env.PORT || 5000} `)
    mongodbConnect();
});