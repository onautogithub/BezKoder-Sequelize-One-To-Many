import Vue from 'vue'
import Router from 'vue-router'
import TutorialDetails from '@/components/TutorialDetails'
import AddTutorial from '@/components/AddTutorial'
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
    }
  ]
})
