module.exports = {
  mode: 'universal',

  head: {
    title: 'Tasks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.1/css/all.css'
      },
    ],
  },

  css: ['~/plugins/css/main.css'],

  plugins: [],

  modules: ['@nuxtjs/axios', 'vue-sweetalert2/nuxt'],
  
  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
  },

  build: {}
}
