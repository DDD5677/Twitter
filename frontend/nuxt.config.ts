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
 build:{
	transpile:['@heroicons/vue']
 },
 runtimeConfig:{
	accessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
	refreshTokenSecret:process.env.REFRESH_TOKEN_SECRET,
	//Cloudinary
	cloudinaryCloudName:process.env.CLOUDINARY_CLOUD_NAME,
	cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
	cloudinaryApiSecret:process.env.CLOUDINARY_API_SECRET,
 }
})
