import {getRefreshTokenByToken} from '~/server/db/refreshTokens'
import { getUserById } from '~/server/db/users'
import { decodeRefreshToken } from '~/server/utils/jwt'
import { generateTokens } from '~/server/utils/jwt'
export default defineEventHandler(async(event)=>{
	const cookies = parseCookies(event)
	const refreshToken = cookies.refreshToken
	if(!refreshToken){
		return sendError(event,createError({
			statusCode:401,
			statusMessage:"Refresh token is invalid"
		}))
	}

	const rToken = await getRefreshTokenByToken(refreshToken)
	if(!rToken){
		return sendError(event,createError({
			statusCode:401,
			statusMessage:"Refresh token is invalid"
		}))
	}

	const token = decodeRefreshToken(refreshToken)

	try {
		const user = await getUserById(token.userId)
		if(!user){
			return sendError(event,createError({
				statusCode:404,
				statusMessage:"The User width given ID is not found"
			}))
		}
		const {accessToken}= generateTokens(user)
		return{
			accessToken
		}
	} catch (error) {
		return sendError(event,createError({
			statusCode:500,
			statusMessage:"Something went wrong"
		}))
	}
})