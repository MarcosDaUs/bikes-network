import { Router } from 'express';
import { body } from 'express-validator';
import { rentBike } from '../controllers/rents';

const router: Router = Router();

router.post(
  '/',
  body('bikeId').isString().not().isEmpty(),
  body('userId').isString().not().isEmpty(),
  body('startDate').isDate().not().isEmpty(),
  body('endDate').isDate().not().isEmpty(),
  rentBike
);

export default router;
