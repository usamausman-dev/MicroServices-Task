const app = require('express')
const router = app.Router()
const { getProducts, postProducts, ProductbyId } = require('./controller')

router.get('/all-products', getProducts)
router.get('/product/:_id', ProductbyId)
router.post('/products', postProducts)

module.exports = router