<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field
          name="email"
          label="Email"
          v-model="email"
        ></v-text-field>
        <v-text-field
          name="password"
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
        <v-alert
          error
          :value="alert"
          transition="scale-transition"
        >
        {{ errors }}
        </v-alert>
        <v-btn primary dark @click="login">Login</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      alert: false,
      email: '',
      password: '',
      errors: ''
    }
  },
  methods: {
    async login () {
      this.$store.dispatch('setLoader', true)
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.alert = false
        // setTimeout(() => {
        //   this.$router.push({ name: 'root' })
        //   // this.$store.dispatch('setLoader', false)
        // }, 1000)
      } catch (err) {
        this.errors = err.response.data.error
        this.alert = true
      }
    }
  },
  components: {
    Panel: () => import('@/components/Panel')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
