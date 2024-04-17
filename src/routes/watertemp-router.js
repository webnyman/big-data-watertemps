/**
 * Temp routes.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves a WatertempController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a UserController object.
 */
const resolveWatertempController = (req) => req.app.get('container').resolve('WatertempController')

// Map HTTP verbs and route paths to controller action methods.

router.get('/mean',
  (req, res, next) => resolveWatertempController(req).index(req, res, next)
)

router.get('/location/:location',
  (req, res, next) => resolveWatertempController(req).dailyByLocation(req, res, next)
)

router.get('/all',
  (req, res, next) => resolveWatertempController(req).dailyByAllLocations(req, res, next)
)
