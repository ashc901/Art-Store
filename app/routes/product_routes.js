// require express docs
const express = require('express')

//require passport
const passport = require('passport')

// require mongoose model
const Product = require('../models/product')

//collection of methods to throw a custom error when detected
const customErrors = require('../../lib/custom_errors')

// non-existant doc is requested
const handle404 = customErrors.handle404

// send 401 when a user tries to modify a resource they don't own
const requireOwnership = customErrors.requireOwnership

//middleware for removing blanks
const removeBlanks = require('../../lib/remove_blank_fields')

//a token MUST be passed for that route to be available, also sets req.user
const requireToken = passport.authenticate('bearer', { session: false })

// create an instance for handling routes
const router = express.Router()

//Now comes the hard part y'all
//ROUTING

//index GET
router.get('/products', requireToken, (req, res, next) => {
  const id = req.user.id
  Product.find({ owner: id })
    .then(products => {

      // needs to be a POJO, so .map to apply .toObject to each one
      return products.map(product => product.toObject())
    })

    // respond with status 200 and JSON of the products
    .then(products => res.status(200).json({ products: products }))

    //if an error occurs, pass it to the handler
    .catch(next)
})

//show GET one
//by id
router.get('/products/:id', requireToken, (req, res, next) => {
  Product.findById(req.params.id)

    // handle the errrrrror
    .then(handle404)

    //if find by id works, send 200
    .then(product => res.status(200).json({ product: product.toObject() }))

    //if err occurs, pass  to handler
    .catch(next)
})

// create POST
router.post('/products', requireToken, (req, res, next) => {

  //owner is current user
  req.body.product.owner = req.user.id

  Product.create(req.body.product)

    //respond to successful 'create' with status 201 and JSON od new "product"
    .then(product => {
      res.status(201).json({ product: product.toObject() })
    })

    .catch(next)
})

// update a product PATCH
router.patch('/products/:id', requireToken, removeBlanks, (req,res, next) => {

  // can't change owner
  delete req.body.product.owner

  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      //require ownership (store owner owns the product)
      //throw err if current user isn't owner
      requireOwnership(req, product)

      // pass the result to the next .then
      return product.updateOne(req.body.product)
    })

    // if success return 204 and no json
    .then(() => res.sendStatus(204))

    //if err occurs pass to handler
    .catch(next)
})

//destroy with DELETE
router.delete('/products/:id', requireToken, (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      //user doesn't own product, throw err
      requireOwnership(req, product)
      //delete only if no error
      product.deleteOne()
    })
    // if deletion success send back 204
    .then(() => res.sendStatus(204))
    //if err pass to handler
    .catch(next)
})

module.exports = router
