<template>
  <div>
    <h1>Register</h1>
    <input v-model="email" type="text" name="email" placeholder="Enter your email" />
    <br />
    <input v-model="password" type="password" name="password" placeholder="Enter your password" />
    <br />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  },
  watch: {
    email: val => {
      console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
