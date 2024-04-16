/**
 * Module for the UserService.
 *
 * @author Björn Nyman <bn222eg@student.lnu.se>
 * @version 1.0.0
 */
import { DataFrame } from 'dataframe-js'
/**
 *
 */
export class WatertempService {
  /**
   * Creates a new user with the given details.
   *
   * @param {object} watertempModel - The water temp model.
   * @returns {Promise<object>} The created user object without sensitive fields.
   */
  constructor (watertempModel) {
    this.watertempModel = watertempModel
  }

  /**
   * Fetches all temperature data.
   *
   * @returns {Promise<Array<object>>} The fetched users.
   */
  async fetchTempAndAnalyze () {
    try {
      // Fetch data from the database
      const data = await this.watertempModel.find()
      const formattedData = data.map(doc => doc.toObject())

      // Load the data into a DataFrame
      const df = new DataFrame(formattedData)

      // Group the data by 'badplats' and calculate the mean temperature
      const result = df.groupBy('badplats').aggregate(group => group.stat.mean('vattentemperatur'))
      console.log(result.toDict())
      // Convert the result to JSON or any other suitable format for response
      return result.toDict()
    } catch (error) {
      console.error('Failed to fetch and analyze temperatures:', error)
      throw error // Optional: re-throw the error for further handling upstream
    }
  }
}
