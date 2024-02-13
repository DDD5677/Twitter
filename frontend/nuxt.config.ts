// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
	plugins: {
	  tailwindcss: {},
	  autoprefixer: {},
	},
 },
 runtimeConfig:{
	accessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
	refreshTokenSecret:process.env.REFRESH_TOKEN_SECRET
 }
})
