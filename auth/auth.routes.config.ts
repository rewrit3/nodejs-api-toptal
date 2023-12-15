import express from 'express';
import { body } from 'express-validator';

import { CommonRoutesConfig } from '../common/common.routes.config';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import authMiddleware from './middleware/auth.middleware';
import authController from './controllers/auth.controller';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      body('email').isEmail(),
      body('password').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);

    return this.app;
  }
}