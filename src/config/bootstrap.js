/**
 * Module for bootstrapping.
 *
 * @author Björn Nyman <bn222eg@student.lnu.se>
 * @version 1.0.0
 */

import { IoCContainer } from '../lib/IoCContainer.js'
import { WatertempService } from '../services/WatertempService.js'
import { HomeController } from '../controllers/home-controller.js'
import { WatertempController } from '../controllers/watertemp-controller.js'
import { connectDB } from './mongoose.js'
import { Watertemp } from '../models/watertemp.model.js'

const iocContainer = new IoCContainer()

iocContainer.register('DatabaseConnection', connectDB, {
  singleton: true,
  type: true // Assuming type: true implies direct use, not instantiation
})

iocContainer.register('HomeController', HomeController, {
  singleton: true
})

iocContainer.register('WatertempModel', Watertemp, { type: true })

iocContainer.register('WatertempService', WatertempService, {
  dependencies: [
    'WatertempModel'
  ],
  singleton: true
})

iocContainer.register('WatertempController', WatertempController, {
  dependencies: [
    'WatertempService'
  ],
  singleton: true
})

export const container = Object.freeze(iocContainer)
