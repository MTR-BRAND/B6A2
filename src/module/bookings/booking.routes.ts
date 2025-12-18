import express from 'express'
import auth from '../../middleware/auth';
import { BookingControllers } from './booking.controllers';

const router = express.Router();

router.post('/' , auth('admin' , 'customer') , BookingControllers.createBooking)
router.get('/' ,  auth('admin' , 'customer') , BookingControllers.getAllBooking)
router.put('/:id' ,  auth('admin','customer'), BookingControllers.StatusUpdate)
export const BookingRouter = router;