import { Router } from 'express';
import { body } from 'express-validator';
import {
  getLocationByBikeId,
  createLocationRoute,
  deleteLocationRoute,
  updateLocationRoute,
} from '../controllers/locations';

const router: Router = Router();

router.post(
  '/',
  body('longitude').isNumeric().not().isEmpty(),
  body('latitude').isNumeric().not().isEmpty(),
  body('bikeId').isString().not().isEmpty(),
  createLocationRoute
);

router.patch(
  '/:bid',
  body('longitude').isString().not().isEmpty(),
  body('latitude').isString().not().isEmpty(),
  updateLocationRoute
);

router.delete('/:bid', deleteLocationRoute);

router.get('/:bid', getLocationByBikeId);

export default router;
