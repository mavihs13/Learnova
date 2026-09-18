import express from 'express';
import healthRoutes from './routes/health.routes.js'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import './database.js'

const app = express();
const port  = 4040;

console.log("Process ID:", process.pid);
app.use(express.json());

app.use('/api', healthRoutes)
app.use('/api', userRoutes)
app.use('/api', authRoutes)

// app.get('/api/health',(req,res)=>{
//     res.json({
//         status:"ok"
//     })
// })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})