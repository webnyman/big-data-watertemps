import jwt from 'jsonwebtoken'

/**
 * Authenticates a user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token
    const privateKey = Buffer.from(
      process.env.PRIVATE_KEY_64,
      'base64'
    ).toString('utf-8')
    const decoded = jwt.verify(token, privateKey)
    req.user = decoded
    res.locals.user = req.user
  } catch (error) {}
  next()
}

export default isLoggedIn
