require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound,errorHandler } = require('./middleware/errorMiddleware');

//connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);

app.get('/',(req,res)=>{
    res.json({message:'TaskFlow API is running!'});
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
})
