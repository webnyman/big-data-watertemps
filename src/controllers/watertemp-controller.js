/**
 * User controller.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */
import cryptoRandomString from 'crypto-random-string'
import { WatertempService } from '../services/WatertempService.js'

/**
 * Encapsulates a controller.
 */
export class WatertempController {
  /**
   * The service.
   *
   * @type {WatertempService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {WatertempService} service - A service instantiated from a class with the same capabilities as UserService.
   */
  constructor (service = new WatertempService()) {
    this.#service = service
    this.state = cryptoRandomString({ length: 128 })
  }

  /**
   * Render all temperatures.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>}
   * @throws {Error} If the users could not be fetched.
   */
  async index (req, res, next) {
   res.render('watertemp/index')
  }
}
