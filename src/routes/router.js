/**
 * The routes.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'
import { router as homeRouter } from './home-router.js'
import { router as watertempRouter } from './watertemp-router.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/watertemp', watertempRouter)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
