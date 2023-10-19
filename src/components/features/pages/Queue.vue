<template>
  <div class="w-full h-screen items-center">
    <div class="mx-auto w-full h-full">
      <div class="w-full text-center py-6">
        <h1 class="mt-12 text-xl md:text-xl font-bold leading-tight uppercase">Nomor Antrian</h1>
      </div>
      <div class="w-full text-center flex justify-center py-6">
        <div class="mx-auto rounded-lg bg-gray-200 p-16">
          <h1 class="text-9xl">{{ lastQueue }}</h1>
        </div>
      </div>
      <div class="w-full text-center">
        <p>{{ formattedDate }}</p>
        <div class="font-medium">
          {{ currentTime }}
        </div>
      </div>
      <div class="w-full text-center py-6">
        <span class="block mb-4">Silakan klik tombol dibawah untuk mencetak nomor antrian</span>
        <button type="button" class="btn btn--primary" @click="createQueue()">Print</button>
      </div>
    </div>
  </div>
  <div id="printable-content" class="hidden">
    <div style="text-align: center;">
      <h5>{{ companyName }}</h5>
      <p style="font-size: small;">{{ companyAddress }}, {{ companyCity }}</p>
      <p style="font-size: small; margin-bottom: 2.5rem;">No. Telp: {{ companyPhone }}</p>
      <h1 style="margin-bottom: 2rem;">{{ lastQueue }}</h1>
      <p style="font-size: small;">{{ formattedDate }}</p>
      <div style="font-size: small; margin-bottom: 2rem;">
        {{ currentTime }}
      </div>      
      <p>Silakan tunggu dan terima kasih</p>
    </div>
  </div>  
</template>

<script>
import { createToastInterface } from 'vue-toastification'
import queueServices from '@/services/queue/queueServices'
import companyServices from '@/services/company/companyServices'

export default {
  name: 'QueuePage',
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

    return {
      toast,
    }
  },  
  data(){
    return {
      companyName: '',
      companyAddress: '',
      companyCity: '',
      companyPhone: '',
      lastQueue: '',
      error: [],
      isLoading: false,
      currentDate: new Date(),
      currentTime: ''
    }
  },
  methods: {
    async createQueue() {
      try {
        /* SET LOADING STATE IS TRUE */
        this.isLoading = true

        const response = await queueServices.create()
        if (response.data.status === 'success') {
          /* SET LOADING STATE IS FALSE */
          this.isLoading = false

          /* GET LAST QUEUE NUMBER */
          const record = response.data.data
          this.lastQueue = record.queue_number
                  
          /* EMPTY ERRORS VARIABLE */
          this.error = []

          /* SUCCESS MESSAGE */
          this.toast.success(response.data.message)

          /* PRINT */
          setTimeout(() => {
            this.printPage()

            this.$swal.fire({
              title: 'Berhasil!',
              text: "Nomor antrian anda sedang dicetak",
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            })            
          }, 500);
        } else {
          /* SET LOADING STATE IS FALSE */
          this.isLoading = false

          /* EMPTY ERRORS VARIABLE */
          this.error = []

          /* ELSE, THROW ERROR MESSAGES */
          this.toast.error(response.data.message)
        }        
      } catch (error) {
        /* SET LOADING STATE IS FALSE */
        this.isLoading = false
        
        /* THROW ERROR MESSAGES */
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          this.toast.error(error.message)
          console.log(error.response)
        } else if (error.request) {
          // The request was made but no response was received
          this.toast.error('No response received from the server')
          console.log(error.request)
        } else {
          // Other errors occurred
          this.toast.error('An error occurred')
          console.log('Error', error.message)
        }
      }
    },
    async fetchLatestQueue() {
      try {
        /* SET LOADING STATE IS TRUE */
        this.isLoading = true

        const response = await queueServices.fetchLatestQueue()
        if (response.data.status === 'success') {
          /* SET LOADING STATE IS FALSE */
          this.isLoading = false

          /* GET LAST QUEUE NUMBER */
          const record = response.data.data
          this.lastQueue = record.queue_number
                  
          /* EMPTY ERRORS VARIABLE */
          this.error = []
        } else {
          /* SET LOADING STATE IS FALSE */
          this.isLoading = false

          /* EMPTY ERRORS VARIABLE */
          this.error = []

          /* ELSE, THROW ERROR MESSAGES */
          this.toast.error(response.data.message)
        }        
      } catch (error) {
        /* SET LOADING STATE IS FALSE */
        this.isLoading = false
        
        /* THROW ERROR MESSAGES */
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          this.toast.error(error.message)
          console.log(error.response)
        } else if (error.request) {
          // The request was made but no response was received
          this.toast.error('No response received from the server')
          console.log(error.request)
        } else {
          // Other errors occurred
          this.toast.error('An error occurred')
          console.log('Error', error.message)
        }
      }
    },
    async fetchCompany() {
      try {
        /* SET LOADING STATE IS TRUE */
        this.isLoading = true

        const response = await companyServices.fetchById(1)
        if (response.data.status === 'success') {
          /* SET LOADING STATE IS FALSE */
          this.isLoading = false

          /* GET LAST QUEUE NUMBER */
          const record = response.data.data
          this.companyName = record.company_name
          this.companyAddress = record.address
          this.companyCity = record.city
          this.companyPhone = record.phone_number
                  
          /* EMPTY ERRORS VARIABLE */
          this.error = []
        } else {
          /* SET LOADING STATE IS FALSE */
          this.isLoading = false

          /* EMPTY ERRORS VARIABLE */
          this.error = []

          /* ELSE, THROW ERROR MESSAGES */
          this.toast.error(response.data.message)
        }        
      } catch (error) {
        /* SET LOADING STATE IS FALSE */
        this.isLoading = false
        
        /* THROW ERROR MESSAGES */
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          this.toast.error(error.message)
          console.log(error.response)
        } else if (error.request) {
          // The request was made but no response was received
          this.toast.error('No response received from the server')
          console.log(error.request)
        } else {
          // Other errors occurred
          this.toast.error('An error occurred')
          console.log('Error', error.message)
        }
      }
    },    
    updateClock() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString(); // Format the time as per your requirements
    },
    printPage() {
      const printableContent = document.getElementById('printable-content')

      // Calculate the center position of the screen
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const printWidth = 600; // You can adjust this width as needed
      const printHeight = 600; // You can adjust this height as needed
      const left = (screenWidth - printWidth) / 2;
      const top = (screenHeight - printHeight) / 2;
      
      // Open the print dialog at the center position
      const printWindow = window.open('', '', `width=${printWidth},height=${printHeight},left=${left},top=${top}`)

      printWindow.document.open()
      printWindow.document.write(`
        <html>
          <head>
            <title>Print List</title>
          </head>
          <body>
            ${printableContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close()
      printWindow.print()
      printWindow.close()
    }    
  },
  computed: {
    formattedDate() {
      return this.currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    },
  },  
  mounted() {
    this.fetchCompany()
    this.fetchLatestQueue()
    this.updateClock();
    setInterval(this.updateClock, 1000); // Update the clock every second    
  }
}
</script>