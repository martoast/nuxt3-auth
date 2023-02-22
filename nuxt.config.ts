// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/styles/main.scss'],
    nitro: {
        devProxy: {
            '/proxy/example': {
                target: 'https://reqres.in/api/',
                prependPath: true,
                changeOrigin: true,
              },
        }
    },
})
