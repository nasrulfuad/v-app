<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <v-progress-linear :active="isLoading" height="4" class="loader" v-bind:indeterminate="true"></v-progress-linear>
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
        <v-alert
          error
          :value="alert"
          transition="scale-transition"
        >
          <p class="my-alert" v-html="errors"></p>
        </v-alert>
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
      alert: false,
      isLoading: false,
      email: '',
      password: '',
      errors: ''
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
        this.alert = false
        setTimeout(() => {
          this.isLoading = false
          this.$router.push({ name: 'root' })
        }, 1000)
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

<style scoped>
.my-alert {
  margin: 0;
}
</style>
