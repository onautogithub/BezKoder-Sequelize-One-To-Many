// First we need to import database object:
const db = require('../models')
const Tutorial = db.tutorials
const Comment = db.comments
const Op = db.Sequelize.Op

// Create and Save new Tutorials
exports.createTutorial = (req, res) => {
  console.log('*******************************************')
  console.log('*********************Creating **********************')
  console.log('*******************************************')
  Tutorial.create({
    title: req.body.title,
    description: req.body.description
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || 'An error occurred while creating tutorials.'
      })
    })
}
// Retrieve All Tutorials
exports.retrieveAllTutorials = (req, res) => {
  console.log('*******************************************')
  console.log('********************retrieveAllTutorials **********************')
  console.log('*******************************************')
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
// Locate and Update the tutorial which is identified by its id
exports.updateTutorial = (req, res) => {
  console.log('*******************************************')
  console.log('*********************updateTutorial **********************')
  console.log('*******************************************')
  const id = req.params.id

  Tutorial.update(req.body, {
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message:
      'Tutorial was sucessfully updated'
        })
      } else {
        res.send({
          message:
      'Unable to locate the tutorial with id ' + id
        })
      }
    }).catch(err => {
      res.status(500).send({
        message:
      err.message || 'Error updating the tutorial with id ' + id
      })
    })
}
// Delete all Tutorials from the database.
exports.deleteAllTutorials = (req, res) => {
  console.log('*******************************************')
  console.log('*********************deleteAllTutorials **********************')
  console.log('*******************************************')
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
  console.log('*******************************************')
  console.log('*********************deleteSpecificTutorial **********************')
  console.log('*******************************************')
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
// Find all published tutorials that are published
exports.retrieveAllPublishedTutorials = (req, res) => {
  console.log('*******************************************')
  console.log('*********************retrieveAllPublishedTutorials **********************')
  console.log('*******************************************')
  Tutorial.findAll({
    where: {published: true}
  })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log('>> Error while fetching published tutorials: ', err)
    })
}
// Create and Save new Comments
// exports.createComment = (res, req) => {
//   return Comment.create({
//     name: comment.name,
//     text: comment.text,
//     tutorialId: tutorialId
//   })
//     .then((comment) => {
//       console.log('>> Created comment: ' + JSON.stringify(comment, null, 4))
//       return comment
//     })
//     .catch((err) => {
//       console.log('>> Error while creating comment: ', err)
//     })
// }
exports.createComment = (req, res) => {
  console.log('*******************************************')
  console.log('*********************createComment **********************')
  console.log('*******************************************')
  Comment.create({
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || 'An error occurred while creating a comment.'
      })
    })
}
// Get the comments for a given tutorial
// exports.findCommentsByTutorialId = (tutorialId) => {
//   return Tutorial.findByPk(tutorialId, { include: ['comments'] })
//     .then((tutorial) => {
//       return tutorial
//     })
//     .catch((err) => {
//       console.log('>> Error while finding tutorial: ', err)
//     })
// }
exports.findCommentsByTutorialId = (req, res) => {
  console.log('*******************************************')
  console.log('*********************findCommentsByTutorialId **********************')
  console.log('*******************************************')
  const id = req.params.id

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message:
      err.message || ' Error retrieving tutorial with id= ' + id
      })
    })
}
// Get the comments for a given comment id
exports.findCommentById = (id) => {
  console.log('*******************************************')
  console.log('*********************findCommentsById **********************')
  console.log('*******************************************')
  return Comment.findByPk(id, { include: ['tutorial'] })
    .then((comment) => {
      return comment
    })
    .catch((err) => {
      console.log('>> Error while finding comment: ', err)
    })
}
// Delete all Comments from the database.
exports.deleteAllComments = (req, res) => {
  console.log('*******************************************')
  console.log('*********************deleteAllComments **********************')
  console.log('*******************************************')
  Comment.destroy({
    where: {}
  })
    .then(nums => {
      res.send({ message: `${nums} Comments were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while deleting the comments.'
      })
    })
}
