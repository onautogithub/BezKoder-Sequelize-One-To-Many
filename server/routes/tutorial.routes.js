const controller = require('../controllers/tutorial.controller')
var router = require('express').Router()

module.exports = app => {
// Create a new Tutorial
  router.post('/', controller.createTutorial)

  // Create a new Comment for a given Tutorial
  router.post('/comments/', controller.createComment)

  // Retrieve a Single Tutorial by its id along with its comments
  router.get('/:id', controller.findTutorialById)

  // Retrieve a Comment by its id. it will also return the associated Tutorial
  router.get('/comments/:id', controller.findCommentById)

  // Retrieve all tutorials and comments
  router.get('/', controller.findAll)

  // Delete all tutorials
  router.delete('/', controller.deleteAllTutorials)

  // Delete a single tutorial identified by its id
  router.delete('/:id', controller.deleteSpecificTutorial)

  // Delete a single comment identified by its id
  router.delete('/comments/:id', controller.deleteSpecificComment)

  // Delete all comments for a specific Tutorial id
  router.delete('/comments/', controller.deleteAllTutorialComments)

  // Update a tutorial identified by its id
  router.put('/:id', controller.updateTutorial)

  // Update a comment identified by its id
  router.put('/comments/:id', controller.updateComment)

  /// ///////////////

  // // Retrieve a Single Tutorial by its Title and its comments
  // router.get('/:title', controller.retrieveAllTutorials)

  // // Retrieve all published Tutorial and their comments
  // router.get('/published', controller.retrieveAllPublishedTutorials)

  // // Retrieve All Comment
  // router.get('/comments/', controller.retrieveAllComments)

  // // Retrieve All Comment for a specific name
  // router.get('/comments/:name', controller.retrieveAllComments)

  // // Retrieve All Comment for a specific tutorial id
  // router.get('/comments/:tutorialId', controller.retrieveAllComments)

  app.use('/tutorials', router)
  app.use('/tutorials/comments', router)
}
