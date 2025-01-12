/**
 * User controller.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */
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
    try {
      const meanTemp = await this.#service.fetchTempAndAnalyze()
      res.render('watertemp/mean-year', {
        meanTemp: JSON.stringify(meanTemp)
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render temperatures by location and year.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>}
   * @throws {Error} If the users could not be fetched.
   */
  async dailyByLocation (req, res, next) {
    try {
      const { location } = req.params
      const data = await this.#service.fetchTemperaturesByLocationAndYear(location)
      res.render('watertemp/daily', {
        data: JSON.stringify(data)
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render temperatures by all locations and year.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>}
   * @throws {Error} If the users could not be fetched.
   */
  async dailyByAllLocations (req, res, next) {
    try {
      const data = await this.#service.fetchTemperaturesForAllLocations()
      res.render('watertemp/daily-all', {
        data: JSON.stringify(data)
      })
    } catch (error) {
      next(error)
    }
  }
}
