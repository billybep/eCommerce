const { Cart, Product, User } = require('../models') 

class CustomerCtrl {

  static showCart (req, res, next) {
    const userId = req.currentUser.id 

    User 
      .findAll({ 
        where   : { id: userId }, 
        include : [{
          model : Product,
          order : ['name', 'asc']
        }]
      })
      .then(cartItems => res.status(200).json({ cartItems }))
      .catch(err => next(err))
  }

  static addItem (req, res, next) {
    const newItem = {
      UserId    : req.currentUser.id,
      ProductId : req.body.ProductId,
      quantity  : +req.body.quantity
    }

    Product
      .findByPk(newItem.ProductId)
      .then(found => {
        if (found.stock - newItem.quantity >= 0) return found
        else res.status(400).json({ message : 'Out of stock!' })
      })
      .then(_=> {
        Cart
          .findOne({ where: { ProductId: newItem.ProductId }})
          .then(foundItem => {
            //? >>>>>>
            if (foundItem) {
              console.log('Existing Item add to cart');
              Cart
              .increment('quantity', { by: 1, where: { ProductId: newItem.ProductId } })
              .then(updated => {
                res.status(200).json({ updated })
                Product
                .decrement('stock', { by: 1, where : { id: newItem.ProductId }})
                .then(_=> console.log('sukses update stock'))
                .catch(err => next(err))
              })
              .catch(err => console.log(err))
            } 
            //? <<<<<<
            else {
              console.log('New Item Add To Cart');
              Cart
              .create(newItem)
              .then(cartItem => {
                Product
                .decrement('stock', { by: newItem.quantity, where : { id: newItem.ProductId }})
                .then(_=> {
                  res.status(200).json({ cartItem })
                })
                .catch(err => next(err))
              })
              .catch(err => next(err))
            }
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
  }

  static update (req, res, next) {
    const id = req.params.id
    const quantity = req.body.quantity

    Product 
      .findOne({ where: { id }, include: User })
      .then((product) => {
        if (product.Users.length > 0) {
          if (product.Users[0].id == req.currentUser.id) {
            Cart
              .update({quantity : quantity}, { where: { ProductId: id }, returning: true })
              .then(updated => {
                res.status(200).json({ updated })
                Product
                .decrement('stock', { by: quantity, where : { id }})
                .then(_=> console.log('sukses update stock'))
                .catch(err => next(err))
              })
              .catch(err => console.log(err))

          } else res.status(401).json({ message: 'Unauthorize!' })
        }
        else res.status(404).json({ message: 'Customer dont have cart item' })
      })
      .catch(err => next(err))
  }

  static delete (req, res, next) {
    const id = req.params.id

    Cart
      .findOne({ where : { ProductId : id } })
      .then(found => {
        if (found.UserId == req.currentUser.id) return found
        else res.status(401).json({ message: 'Unauthorize!' })
      })
      .then(found => {
        Cart
          .destroy({ where: {ProductId : id}, returning: true })
          .then(deleted => {
            res.status(200).json({ deleted })
            
            Product
              .increment('stock', { by: found.quantity, where : { id } })
              .then( _=> console.log('Stock recover'))
              .catch(err => next(err))
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
  }
}

module.exports = CustomerCtrl