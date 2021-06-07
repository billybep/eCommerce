'use strict'

if (process.env.NODE_ENV !== "production") require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.use((err, req, res, next) => {
  console.log(err,'zzzz>>>>>>>>>>>>>>>>>>>>>>')
  
  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400).json({ message: err.errors[0].message })
      break;  
    case 'SequelizeDatabaseError':
      res.status(500).json({ message: 'Internal server error!' })
      break;
    case 'JsonWebTokenError':
      res.status(400).json({ message: 'Invalid Token' })
      break;
    default: res.status(500).json({ message: err.message })
      break; 
  }
})

module.exports = app