const tutorials = require('../controllers/tutorial.controller.js')
var router = require('express').Router()

module.exports = app => {
  // Create a new Tutorial
  router.post('/', tutorials.create)

  // Retrieve all tutorials
  router.get('/', tutorials.findAll)

  // Retrieve all published tutorials
  router.get('/published', tutorials.findAllPublished)

  // Retrieve a Single Tutorial by its id
  router.get('/:id', tutorials.findOne)

  // Update a tutorial identified by its id
  router.put('/:id', tutorials.update)

  // Delete a single tutorial identified by its id
  router.delete('/:id', tutorials.delete)

  // Delete all tutorials
  router.delete('/', tutorials.deleteAll)

  app.use('/tutorials', router)
}
