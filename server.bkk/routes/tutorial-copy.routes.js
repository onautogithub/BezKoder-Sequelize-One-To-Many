const controller = require('../controllers/tutorial.controller')
var router = require('express').Router()

module.exports = app => {
// Create a new Tutorial
  router.post('/', controller.createTutorial)

  // Retrieve all tutorials and comments
  router.get('/', controller.retrieveAllTutorials)

  // Retrieve a Single Tutorial by its Title and its comments
  router.get('/:title', controller.retrieveAllTutorials)

  // Retrieve a Single Tutorial by its id and its comments
  router.get('/:id', controller.retrieveTutorialById)

  // Retrieve all published Tutorial and their comments
  router.get('/published', controller.retrieveAllPublishedTutorials)

  // Update a tutorial identified by its id
  router.put('/:id', controller.updateTutorial)

  // Delete a single tutorial identified by its id
  router.delete('/:id', controller.deleteSpecificTutorial)

  // Delete all tutorials
  router.delete('/', controller.deleteAllTutorials)

  // // Create a new Comment for a given Tutorial
  // router.post('/comments/', controller.createCommentForTutorial)

  // // Retrieve All Comment
  // router.get('/comments/', controller.retrieveAllComments)

  // // Retrieve a Comment by its id. it will also return the associated Tutorial
  // router.get('/comments/:id', controller.retrieveSpecificComment)

  // // Retrieve All Comment for a specific name
  // router.get('/comments/:name', controller.retrieveAllComments)

  // // Retrieve All Comment for a specific tutorial id
  // router.get('/comments/:tutorialId', controller.retrieveAllComments)

  // // Delete a single comment identified by its id
  // router.delete('/comments/:id', controller.deleteSpecificComment)

  app.use('/tutorials', router)
  app.use('/tutorials/comments', router)
}
