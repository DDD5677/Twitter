//import { useCookie } from "nuxt/app"

import { removeRefreshToken } from "~/server/db/refreshTokens"

export default defineEventHandler(async(event)=>{
	try {
		const cookies = parseCookies(event)
		const refreshToken = cookies.refreshToken
		//remove refresh token
		await removeRefreshToken(refreshToken)
	} catch (error) {
		
	}
	sendRefreshToken(event,'')
	return {message:'You logged out successfully'}
})