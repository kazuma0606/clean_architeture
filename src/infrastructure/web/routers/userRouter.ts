import { Router } from 'express';
import { UserController } from '../../../adapter/controllers/userController';

export function userRoutes(userController: UserController): Router {
  const router = Router();

  // Implement routes
  router.post('/', userController.createUser.bind(userController));
  router.get('/:id', userController.findById.bind(userController));

  return router;
}
