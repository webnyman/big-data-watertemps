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
      // Convert the result to JSON or any other suitable format for response
      return result.toDict()
    } catch (error) {
      console.error('Failed to fetch and analyze temperatures:', error)
      throw error // Optional: re-throw the error for further handling upstream
    }
  }

  /**
   * Fetches all temperature data by location and year.
   *
   * @param {string} location - The location.
   * @returns {Promise<Array<object>>} The fetched users.
   */
  async fetchTemperaturesByLocationAndYear (location) {
    try {
      // Fetch data from MongoDB
      const rawData = await this.watertempModel.find({ badplats: location }).lean()

      // Convert raw data to a format suitable for DataFrame manipulation
      // Including converting the mattidpunkt from string to Date and extracting the month
      const formattedData = rawData.map(row => ({
        ...row,
        date: new Date(row.mattidpunkt).toISOString().split('T')[0] // Convert mattidpunkt to Date and extract month
      }))

      // Create a DataFrame from the formatted data
      const df = new DataFrame(formattedData)

      // Group by month and calculate average temperature
      const result = df.groupBy('date').aggregate(group => ({
        averageTemp: group.stat.mean('vattentemperatur')
      })).rename('aggregation', 'averageTemp')

      // Sort results by date
      return result.sortBy('date').toDict()
    } catch (error) {
      console.error('Error processing temperatures:', error)
      throw error
    }
  }

  /**
   * Fetches all temperature data for all locations and year.
   *
   * @returns {Promise<Array<object>>} The fetched users.
   */
  async fetchTemperaturesForAllLocations () {
    try {
      // Fetch data from MongoDB without filtering by location
      let rawData = await this.watertempModel.find()
      // Convert raw data to a format suitable for DataFrame manipulation
      rawData = rawData.map(doc => doc.toObject())
      const formattedData = rawData.map(row => ({
        ...row,
        date: new Date(row.mattidpunkt).toISOString().split('T')[0] // Convert mattidpunkt to Date and extract the date
      }))

      // Create a DataFrame from the formatted data
      const df = new DataFrame(formattedData)

      // Group by date and location, then calculate average temperature
      const result = df.groupBy('date', 'badplats').aggregate(group => ({
        averageTemp: group.stat.mean('vattentemperatur')
      })).rename('aggregation', 'averageTemp')

      // Sort results by date
      return result.sortBy('date').toDict()
    } catch (error) {
      console.error('Error processing temperatures for all locations:', error)
      throw error
    }
  }

  /**
   * Returns the possible locations.
   *
   * @returns {object} The possible locations.
   */
  getLocations () {
    return this.watertempModel.schema.path('badplats').enumValues
  }
}
