import {getUser} from '../repositories/user.repository.js'
import type {userDTO} from '../schemas/user.dto.js'

export const getUserService = ():userDTO=>{
    return getUser();
}