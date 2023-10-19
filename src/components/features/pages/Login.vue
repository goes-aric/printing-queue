<template>
  <div class="md:flex w-full h-full">
    <div class="bg-gray-50 hidden lg:block md:w-1/2 xl:w-2/3 h-screen">
      <LoginBackground />
    </div>
    <div class="relative bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center">
      <div class="w-full h-100">
        <span class="mt-12">Selamat Datang</span>
        <h1 class="text-xl md:text-2xl font-bold leading-tight">Masuk ke akun Anda</h1>
        <Form class="mt-6" @submit="authUser()">
          <div>
            <label for="username" class="label-control">Username</label>
            <Field type="text" id="username" name="username" v-model="username" rules="required" label="Username" placeholder="Masukan Username" class="form-control bg-gray-200 focus:bg-white focus:outline-none" autofocus />
            <ErrorMessage name="username" class="capitalize text-sm text-red-600" />
            <div v-if="error.username" class="capitalize text-sm text-red-600"><span>{{ error.username[0] }}</span></div>
          </div>
          <div class="mt-4">
            <label for="password" class="label-control">Password</label>
            <div class="relative flex justify-between items-center">
              <Field :type="inputType" id="password" name="password" v-model="password" rules="required" label="Password" placeholder="Masukan Password" class="form-control bg-gray-200 focus:bg-white focus:outline-none" />
              <span class="h-full absolute cursor-pointer right-0">
                <IconHide v-if="!visibility" @click="togglePassword()" class="m-3.5" />
                <IconView v-if="visibility" @click="togglePassword()" class="m-3.5" />
              </span>                      
            </div>
            <ErrorMessage name="password" class="capitalize text-sm text-red-600" />
            <div v-if="error.password" class="capitalize text-sm text-red-600"><span>{{ error.password[0] }}</span></div>         
          </div>
          <button :disabled="isLoading" type="submit" class="w-full btn btn--primary font-normal mt-6 disabled:opacity-50">
            {{ isLoading ? 'Memproses...' : 'Masuk' }}
          </button>
        </Form>
      </div>
      <!-- <div class="absolute bottom-4">
        <span class="text-sm font-light">&copy; 2023 App</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { createToastInterface } from 'vue-toastification'
import { Field, Form, ErrorMessage } from "vee-validate"
import authServices from '@/services/user/authServices'
import IconView from '../../icons/IconView.vue'
import IconHide from '../../icons/IconHide.vue'
import LoginBackground from '../../icons/LoginBackground.vue'

export default {
  name: 'LoginPage',
  components: {
    Field,
    Form,
    ErrorMessage,
    IconView,
    IconHide,
    LoginBackground
  },  
  setup () { 
    const toastOptions = {
      position: "top-right",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
      draggable: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: false,
      rtl: false
    }
    const toast = createToastInterface(toastOptions)

    const schema = {
      username: 'required|length:5',
      password: 'required|length:6',        
    }  

    return {
      toast,
      schema
    }
  },
  data(){
    return{
      username: '',
      password: '',
      visibility: false,
      inputType: 'password',
      error: [],
      isLoading: false,   
    }
  },
  methods: {
    async authUser(){
      try {
        /* SET LOADING STATE IS TRUE */
        this.isLoading = true

        const payload = {
          username: this.username,
          password: this.password
        }
        const response = await authServices.login(payload)
        if (response.data.status === 'success') {
          /* CLEAR INPUT FORM */
          this.clearForm()

          /* EMPTY ERRORS VARIABLE */
          this.error = []

          /* STORE DATA TO LOCAL STORAGE */
          localStorage.setItem('accessToken', response.data.access_token)

          this.$store.dispatch('setAuthentication', response.data.access_token)
          this.$store.dispatch('setUser', response.data.data)

          /* SUCCESS MESSAGE */
          // this.toast.success(response.data.message)

          /* WELCOME MESSAGE */
          this.toast.success('Selamat datang ' + this.$store.state.user.name)

          /* REDIRECT TO HOME / DASHBOARD */
          this.$router.push('/queue')
        } else {
          /* SET LOADING STATE IS FALSE */
          this.isLoading = false

          /* EMPTY ERRORS VARIABLE */
          this.error = []

          /* STORE RESPONSE MESSAGE TO A VARIABLE */
          let responseReturn = response.data.message

          /* IF RESPONSE HAS OBJECT USERNAME OR PASSWORD, STORE RESPONSE TO ERRORS VARIABLE */
          if (responseReturn.username || responseReturn.password) {
              this.error = response.data.message

          /* ELSE, THROW ERROR MESSAGES */
          } else {
            this.toast.error(response.data.message)
          }
        }        
      } catch (error) {
          /* SET LOADING STATE IS FALSE */
          this.isLoading = false
          
          /* ELSE, THROW ERROR MESSAGES */
          this.toast.error(error.message)
      }
    },
    clearForm(){
      this.username = '',
      this.password = ''
    },
    togglePassword(){
      this.visibility = !this.visibility
      this.inputType = this.visibility == false ? 'password' : 'text'
    }  
  }
}
</script>