<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <v-progress-linear :active="isLoading" height="4" class="loader" v-bind:indeterminate="true"></v-progress-linear>
      <v-snackbar
        bottom
        mode
        :timeout="timeout"
        error
        multi-line
        v-model="snackbar"
      >
        <span v-html="errors"></span>
        <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
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
      email: '',
      password: '',
      errors: '',
      isLoading: false,
      snackbar: false,
      timeout: 1500
    }
  },
  methods: {
    async login () {
      try {
        this.isLoading = true
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        setTimeout(() => {
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.snackbar = false
          this.isLoading = false
          this.$router.push({ name: 'root' })
        }, 1000)
      } catch (err) {
        this.errors = err.response.data.error
        this.snackbar = true
        this.isLoading = false
      }
    }
  },
  components: {
    Panel: () => import('@/components/Panel')
  }
}
</script>

<style scoped>

</style>
