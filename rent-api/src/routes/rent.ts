import { Router } from 'express';
import { body } from 'express-validator';
import { getRentsByBikeId, createRentRoute } from '../controllers/rents';

const router: Router = Router();

router.post(
  '/',
  body('userId').isString().not().isEmpty(),
  body('bikeId').isString().not().isEmpty(),
  body('startDate').isISO8601().not().isEmpty(),
  body('endDate').isISO8601().not().isEmpty(),
  createRentRoute
);

router.get('/:bid', getRentsByBikeId);

export default router;
