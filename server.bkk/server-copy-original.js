// Check the result
// – First, we import our database object and await controller above.
// - Then we call Sequelize sync() method.

const db = require('./models')
const controller = require('./controllers/tutorial.controller')
// const tutorialModel = require('./models/tutorial.model')
const run = async () => {
  const tut1Data = await controller.findTutorialById(1)
  // const tut1Data =  await controller.findTutorialById(tut1.id)
  console.log(
    '>> Tutorial id= ' + tut1Data.id,
    JSON.stringify(tut1Data, null, 2)
  )

  // const comment1 =  await controller.createComment(1, {
  //   name: 'comment for tut1',
  //   text: 'One of the best tuts :) '
  // })
}

// Now, let's call Sequelize sync() method.
db.sequelize.sync({force: false})
  .then(() => {
    console.log('Drop and re-sync db')
    run()
  })

// // Now, we’re gonna test the result by putting the next lines of code inside run() function.
// // You can run the this Sequelize one-to-many Node.js application with
// //  command: node server.js.

// Test 1 - Create few Tutorials by calling the createTutorial method
// const tut1 =   await controller.createTutorial({
//   title: 'Tut1',
//   description: 'Tut1 description'
// })

// const tut2 =   await controller.createTutorial({
//   title: 'Tut2',
//   description: 'Tut2 description'
// })

// // // Test 2 - Create few comments for these Tutorials by calling the createComment
//  const comment1 =  await controller.createComment(tut1.id, {
//   name: 'comment for tut1',
//   text: 'One of the best tuts :) '
// })

//  await controller.createComment(tut1.id, {
//   name: 'Another comment for tut1',
//   text: 'Second comment for tut1 '
// })

// //  Create comment for tut2 (one-to-many)
//  const comment2 = await controller.createComment(tut2.id, {
//   name: 'comment for tut2',
//   text: 'comment for tut2'
// })

// Get Tutorial by given id. Pass tut1 id (tut1.id)
// const tut1Data =  await controller.findTutorialById(1)
// //const tut1Data =  await controller.findTutorialById(tut1.id)
// console.log(
//   '>> Tutorial id= ' + tut1Data.id,
//   JSON.stringify(tut1Data, null, 2)
// )

// // Search for tut2 by passing its id - tut2.id
// const tut2Data =  await controller.findTutorialById(tut2.id)
// console.log(
//   '>> Tutorial id= ' + tut2Data.id,
//   JSON.stringify(tut2Data, null, 2)
// )

// // Get Comment by given id for comments 1 and 2
// const comment1Data =  await controller.findCommentById(comment1.id)
// console.log(
//   '>> Comment id= ' + comment1.id,
//   JSON.stringify(comment1Data, null, 2)
// )

// // Get Comment by given id (pass id 2 this time)
// const comment2Data =  await controller.findCommentById(comment2.id)
// console.log(
//   '>> Comment id= ' + comment2.id,
//   JSON.stringify(comment2Data, null, 2)
// )

// // Get all Tutorials
// const tutorials =  await controller.findAll()
// console.log(
//   '>> All tutorials ', JSON.stringify(tutorials, null, 2)
// )
