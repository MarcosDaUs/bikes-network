import { Router } from 'express';
import { body } from 'express-validator';
import { createBike, updateBike, deleteBike } from '../controllers/bikes';

const router: Router = Router();

router.post(
  '/',
  body('model').isString().not().isEmpty(),
  body('color').isString().not().isEmpty(),
  body('longitude').isNumeric().not().isEmpty(),
  body('latitude').isNumeric().not().isEmpty(),
  createBike
);

router.patch(
  '/:bid',
  body('model').isString().not().isEmpty(),
  body('color').isString().not().isEmpty(),
  body('longitude').isNumeric().not().isEmpty(),
  body('latitude').isNumeric().not().isEmpty(),
  updateBike
);

router.delete('/:bid', deleteBike);

export default router;
