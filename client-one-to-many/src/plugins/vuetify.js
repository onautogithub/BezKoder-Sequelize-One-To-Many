// You must install material-design-icons-iconfont@6.6.0
// You must update the main.js by adding the following: import 'material-design-icons-iconfont/dist/material-design-icons.css'
// Check this website for the icons: https://vuetifyjs.com/en/features/icon-fonts/
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
export default new Vuetify({
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  }
})
