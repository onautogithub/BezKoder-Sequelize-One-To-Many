import Vue from 'vue'
import Router from 'vue-router'
import TutorialDetails from '@/components/TutorialDetails'
import CommentDetails from '@/components/CommentDetails'
import AddTutorial from '@/components/AddTutorial'
import AddComment from '@/components/AddComment'
import TutorialsList from '@/components/TutorialsList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/tutorials',
      name: 'tutorials',
      component: TutorialsList
    },
    {
      path: '/tutorials/:id',
      name: 'tutorial-details',
      component: TutorialDetails
    },
    {
      path: '/add',
      name: 'add',
      component: AddTutorial
    },
    {
      path: '/comment',
      name: 'comment-details',
      component: CommentDetails
    },
    {
      path: '/addComment',
      name: 'add-comment',
      component: AddComment
    }
  ]
})
