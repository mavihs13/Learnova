import type {userDTO} from '../schemas/user.dto.js'

export const getUser = ():userDTO=>{
    return {
        id:1,
        name:"mavi",
        email:"mavi@gmail.com"
    }
}