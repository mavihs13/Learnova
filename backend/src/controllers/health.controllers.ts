import type {Request,Response} from 'express'
import healthStatusService from '../services/health.service.js'

const healthController = (req:Request , res:Response)=>{
    const status = healthStatusService();
    res.json({
        status
    })
}
export default healthController