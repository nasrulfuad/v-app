<template>
  <div>
    <h1>Register</h1>
    <input v-model="email" type="text" name="email" placeholder="email" />
    <br />
    <input v-model="password" type="password" name="password" placeholder="password" />
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
  watch: {
    email (val) {
      console.log(val)
    }
  },
  methods: {
    async register () {
      await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.email = 'Hello'
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
