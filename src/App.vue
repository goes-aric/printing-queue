<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import IdleTimer from './helpers/idleTimer'

export default {
  name: 'App',
  data() {
    return {
      isTimeOut: false
    }
  },
  created() {
    const timer = new IdleTimer({
      timeout: import.meta.env.VITE_APP_TIMEOUT || 900,
      onTimeOut: () => {
        this.isTimeOut = true
      }
    })

    return () => {
      timer.cleanUp()
    }
  },
}
</script>