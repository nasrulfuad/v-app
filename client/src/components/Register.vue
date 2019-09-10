<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <v-progress-linear :active="isLoading" height="4" class="loader" v-bind:indeterminate="true"></v-progress-linear>
      <v-snackbar
        bottom
        mode
        multi-line
        :timeout="timeout"
        error
        v-model="snackbar"
      >
        <p v-html="errors"></p>
         <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
      <panel title="Register">
        <form autocomplete="off">
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
        </form>
        <v-btn primary dark @click="register">Register</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      isLoading: false,
      email: '',
      password: '',
      errors: '',
      snackbar: false,
      timeout: 1500
    }
  },
  methods: {
    async register () {
      try {
        this.isLoading = true
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.snackbar = false
        setTimeout(() => {
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
