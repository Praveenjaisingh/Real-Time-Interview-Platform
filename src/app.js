const express = require('express');
const cors = require('cors');
const path = require("path");

const userRoutes = require('./Routes/userRoutes');
const interviewRoutes = require('./Routes/interviewRoutes');
const feedbackRoutes = require('./Routes/feedbackRoutes');
const notificationRoutes = require('./Routes/notificationRoutes');
const questionRoutes = require('./Routes/questionRoutes');
const roomRoutes = require('./Routes/roomRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const submissionRoutes= require('./Routes/submissionRoutes');

const errorHandler = require("./Middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"../public")));

app.use('/api/users', userRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/interviewrooms', roomRoutes);
app.use('/api/chats', chatRoutes);
app.use("/api/submissions", submissionRoutes);

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,"../public/login.html"));
});

app.use(errorHandler);

module.exports = app;