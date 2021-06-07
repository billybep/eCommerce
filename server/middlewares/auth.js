const { decodeToken } = require('../helpers/jwt')
const { User } = require('../models')

const authenticate = (req, res, next) => {
  const { access_token } = req.headers

  if (!access_token) res.status(400).json({ message: 'InvalidToken' })
  else {
    const decode = decodeToken(access_token)

    User
      .findOne({ where: { email:  decode.email }})
      .then(found => {
        if (!found) res.status(400).json({ message: 'InvalidData' })
        else {
          req.currentUser = {
            id        : decode.id,
            username  : decode.username,
            email     : decode.email,
            role      : decode.role
          }
          next()
        }
      })
      .catch(err => next(err))
  }
}

const authorize = (req, res, next) => {
  if (!req.currentUser) res.status(401).json({ message: 'Unauthorize user!' })
  else {
    User
      .findOne({ where: { email: req.currentUser.email }})
      .then(found => {
        if (!found) res.status(404).json({ message: 'Data not found!' })
        else {
          if (found.role == 'admin') next()
          else res.status(401).json({ message: 'Unauthorize user!' })
        }
      })
      .catch(err => next(err))
  }
}

module.exports = { authenticate, authorize }  