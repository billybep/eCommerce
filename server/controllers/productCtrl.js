const { Product } = require('../models')

class ProductCtrl {
  static show (req, res, next) {
    Product
      .findAll()
      .then(products => {
        res.status(200).json({ products })
      })
      .catch(err => next(err))
  }

  static create (req, res, next) {
    const newProduct = {
      name        : req.body.name,
      description : req.body.description,
      image_url   : req.body.image_url,
      price       : req.body.price,
      stock       : req.body.stock
    }

    Product
      .create({ ...newProduct })
      .then(newProduct => res.status(201).json({ newProduct }))
      .catch(err => next(err))
  }

  static update (req, res, next) {
    const id = req.params.id
    const dataUpdate = {
      name        : req.body.name,
      description : req.body.description,
      image_url   : req.body.image_url,
      price       : req.body.price,
      stock       : req.body.stock
    }

    Product
      .update(dataUpdate, { where: {id}, returning: true })
      .then(updated => res.status(200).json({ updated }))
      .catch(err => next(err))
  }

  static delete (req, res, next) {
    const id = +req.params.id

    Product
      .destroy({ where: { id }, returning: true })
      .then(deleted => {
        if (deleted) res.status(200).json({ message: 'Product has been delete!' })
        else res.status(404).json({ message: 'Data not found!' })
      })
      .catch(err => next(err))
  }
}

module.exports = ProductCtrl