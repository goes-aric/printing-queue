import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import Toast from "vue-toastification"
import { defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import id from '@vee-validate/i18n/dist/locale/id.json'
import print from 'vue3-print-nb'
import Number from '@coders-tm/vue-number-format'
import './assets/css/app.css'
import './assets/css/custom.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import "vue-toastification/dist/index.css"

// Make the validat aggressive to show case validators
configure({
  validateOnInput: true,
  generateMessage: localize("id", id),
})

// Install all rules
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueSweetalert2)
app.use(Toast)
app.use(print)
app.use(Number, { precision: 4 })

app.mount('#app')