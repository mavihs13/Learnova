import express from 'express';
import healthRoutes from './routes/health.routes.js'
import userRoutes from './routes/user.route.js'
const app = express();
const port  = 4040;

console.log("Process ID:", process.pid);

app.use('/api', healthRoutes)
app.use('/api', userRoutes)

// app.get('/api/health',(req,res)=>{
//     res.json({
//         status:"ok"
//     })
// })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})