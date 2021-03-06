// import database object
const db = require('../models')
const Tutorial = db.tutorials
const Comment = db.comments
const Op = db.Sequelize.Op

// Create a new Tutorial ********
exports.createTutorial = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Title can not be empty!'
    })
    return
  }
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while creating the Tutorial.'
      })
    })
}
// Create a new Comment for a given Tutorial
exports.createComment = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Comment cannot be empty!'
    })
    return
  }
  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId
  }
  console.log(comment)
  Comment.create(comment)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while creating a Comment for Tutorial.' + comment.tutorialId
      })
    })
}
// Retrieve a single tutorial by its Id along with all its comments
exports.findTutorialById = (req, res) => {
  const tutorialId = req.params.id
  console.log(tutorialId)
  Tutorial.findByPk(tutorialId, {
    include: ['comments']})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving Tutorial id: ' + tutorialId
      })
    })
}

// Get the comments for a given comment id
exports.findCommentById = (req, res) => {
  const commentId = req.params.id
  console.log(commentId)
  Comment.findByPk(commentId)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving comment id: ' + commentId
      })
    })
}

// Retrieve All Tutorials
exports.findAll = (req, res) => {
  console.log('i am being called findall')
  const title = req.query.title
  var condition = title ? {title: { [Op.like]: `%${title}%` }} : null

  Tutorial.findAll({
    where: condition,
    include: ['comments'] })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.'
      })
    })
}
// Delete all Tutorials from the database.
exports.deleteAllTutorials = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all tutorials.'
      })
    })
}
// Delete a Tutorial with the specified id in the request
exports.deleteSpecificTutorial = (req, res) => {
  const tutorialId = req.params.id

  Tutorial.destroy({
    where: { id: tutorialId }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: `Tutorial with id ${tutorialId} was deleted successfully!`
        })
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${tutorialId}. Maybe Tutorial was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while deleting Tutorial id: ' + tutorialId
      })
    })
}
// Delete a Specific comment
exports.deleteSpecificComment = (req, res) => {
  const commentId = req.params.id
  console.log(commentId)

  Comment.destroy({
    where: { id: commentId }
  })
    .then(num => {
      if (num) {
        res.send({
          message: `Comment with id ${commentId} was deleted successfully!`
        })
      } else {
        res.send({
          message: `Cannot delete comment with id=${commentId}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while deleting comment id: ' + commentId
      })
    })
}
// Delete all comments for a single tutorial
exports.deleteAllTutorialComments = (req, res) => {
  const comments = {
    tutorialId: req.body.tutorialId
  }
  Comment.destroy(comments)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while deleting the comments for Tutorial: ' + this.tutorialId
      })
    })
}
// exports.deleteAllTutorialComments = (req, res) => {
//   const comments = {
//     tutorialId: req.body.tutorialId
//   }
//   console.log(tutorialId)

//   Comment.destroy({
//     where: { tutorialId: tutorialId }
//   })
//     .then(num => {
//       if (num) {
//         res.send({
//           message: `All Comments for Tutorial id ${tutorialId} were deleted successfully!`
//         })
//       } else {
//         res.send({
//           message: `Unable to delete comments for Tutorial id: ${tutorialId}.`
//         })
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || `An error occurred while deleting comments for Tutorial id: ${tutorialId}.`
//       })
//     })
// }
// Update a specific Tutorial
exports.updateTutorial = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Title can not be empty!'
    })
    return
  }
  const tutorialId = req.params.id
  console.log(tutorialId)
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }

  Tutorial.update(tutorial, {
    where: { id: tutorialId }
  })
    .then(num => {
      if (num) {
        res.send({
          message: 'Tutorial was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${tutorialId}. Maybe Tutorial was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while deleting Tutorial id: ' + tutorialId
      })
    })
}

// Update a specific Tutorial
exports.updateComment = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Comment cannot be empty!'
    })
    return
  }
  const commentId = req.params.id
  console.log(commentId)
  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId
  }

  Comment.update(comment, {
    where: { id: commentId }
  })
    .then(num => {
      if (num) {
        res.send({
          message: `Comment with id ${commentId} was updated successfully.`
        })
      } else {
        res.send({
          message: `Unable to update Comment with id=${commentId}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while updating comment with id: ' + commentId
      })
    })
}
