const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const encodeToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET)
}

const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = { encodeToken, decodeToken }
