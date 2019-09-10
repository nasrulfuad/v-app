<template>
  <v-app>
    <page-header />
    <main class="pt-2">
      <v-container fluid class="min-height">
        <router-view />
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isLoading: true
    }
  },
  components: {
    PageHeader: () => import('./components/Header')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Scheherazade:400,700&subset=arabic');
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  box-sizing: border-box;
}
.min-height {
  min-height: 0% !important;
}
.loader {
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0;
}
</style>
