import express from 'express'
import { userControllers } from './user.controllers'
import auth from '../../middleware/auth'

const router = express.Router()

router.get('/'  , auth("admin") , userControllers.getUser)
router.put('/:id' , auth("admin" , "customer") , userControllers.UpdateUser)
router.delete('/:id' , auth("admin") , userControllers.DeleteUser)

export const  UserRouter = router