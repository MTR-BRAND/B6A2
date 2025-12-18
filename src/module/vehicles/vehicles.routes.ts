import exprees from 'express'
import { vehiclesControllers } from './vehicles.controllers'
import auth from '../../middleware/auth'

const router = exprees.Router()

router.post('/' , auth('admin') , vehiclesControllers.createVehicles)
router.get('/', vehiclesControllers.getAllVehicles)
router.get('/:id' , vehiclesControllers.getOneVehicles)
router.put('/:id' , auth('admin') ,  vehiclesControllers.UpdateVehicles)
router.delete('/:id', auth('admin') ,  vehiclesControllers.DeleteVehicles)
// router.put('/:id' , auth("admin") , vehiclesControllers.onUpdate)
export const VehiclesRouter = router