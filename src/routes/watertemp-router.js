/**
 * User routes.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves a UserController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a UserController object.
 */
const resolveUserController = (req) => req.app.get('container').resolve('WatertempController')

// Map HTTP verbs and route paths to controller action methods.

router.get('/',
  (req, res, next) => resolveUserController(req).index(req, res, next)
)
