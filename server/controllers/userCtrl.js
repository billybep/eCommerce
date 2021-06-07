const { User } = require('../models')
const { decryptPassword } = require('../helpers/bcrypt')
const { encodeToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserCtrl {

  static register(req, res, next) {
    const newCustomer = {
      username  : req.body.username,
      email     : req.body.email,
      password  : req.body.password
    }
    console.log(newCustomer);
    User
      .create({ ...newCustomer })
      .then(customer => {
        res.status(201).json({
          username: customer.username,
          email   : customer.email
        })
      })
      .catch(err => next(err))
  }

  static login(req, res, next) {
    const { email, password } = req.body

    User
      .findOne({ where: { email }})
      .then(found => {
        if (!found) res.status(404).json({ message: 'wrong email/password' })
        else {
          if (!decryptPassword(password, found.password)) res.status(404).json({ message: 'wrong email/password' })
          else {
            const access_token = encodeToken({
              id        : found.id,
              username  : found.username,
              email     : found.email,
              role      : found.role
            })

            res.status(200).json({ 
              id        : found.id,
              username  : found.username,
              email     : found.email,
              role      : found.role,
              access_token
            })
          } 
        }
      })
      .catch(err => next(err))
  }

  static googleLogin (req, res, next) {
    const {idToken} = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email;

    client.verifyIdToken({
      idToken: idToken,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      email = payload.email

      return User.findOne({ where: { email }})
    })
    .then(found => {
      if (found) return found
      else {
        const newGoogleUser = {
          username : email,
          email,
          password : Math.random()*1000 + 'googleLogin'
        }
        return User.create({ ...newGoogleUser })
      }
    })
    .then(newUser => {
      const payload = { id: newUser.id, username: newUser.username, email: newUser.email }
      const access_token = encodeToken(payload)
      res.status(200).json({ 
        id      : newUser.id, 
        username: newUser.username, 
        email   : newUser.email, 
        access_token 
      })
    })
    .catch(err => next(err))
  }
}

module.exports = UserCtrl