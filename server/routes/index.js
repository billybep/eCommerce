const router = require ('express').Router()
const UserCtrl = require('../controllers/userCtrl')
const ProductCtrl = require('../controllers/productCtrl')
const CustomerCtrl = require('../controllers/customerCtrl')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', (req, res) => res.send('CMS + Ecommers server running...'))

router.post('/login', UserCtrl.login)
router.post('/googleLogin', UserCtrl.googleLogin)
router.post('/register', UserCtrl.register)
router.get('/products', ProductCtrl.show)

router.use(authenticate)
router.post('/products', authorize, ProductCtrl.create)
router.put('/products/:id', authorize, ProductCtrl.update)
router.delete('/products/:id', authorize, ProductCtrl.delete)

router.get('/customers', CustomerCtrl.showCart)
router.post('/customers', CustomerCtrl.addItem)
router.put('/customers/:id', CustomerCtrl.update)
router.delete('/customers/:id', CustomerCtrl.delete)

module.exports = router 