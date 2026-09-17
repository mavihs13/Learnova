import getHealthData from '../repositories/health.repository.js'

const healthStatusService = ()=>{

    return getHealthData();
}
export default healthStatusService;