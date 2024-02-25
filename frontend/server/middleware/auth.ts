import UrlPattern from "url-pattern"
import { decodeAccessToken } from "../utils/jwt"
import { getUserById } from "../db/users"

export default defineEventHandler(async (event)=>{
	const endpoints =[
		'/api/auth/user',
		'/api/user/tweets',
		'/api/tweets',
		'/api/tweets/:id',
	]

	const isHandledByThisMiddleware = endpoints.some(endpoint=>{
		const pattern = new UrlPattern(endpoint)
		if(!event.node.req.url)return
		return pattern.match(event.node.req.url)
	})
	if(!isHandledByThisMiddleware){
		return
	}
	const token = event.node.req.headers['authorization']?.split(' ')[1]
	if(!token){
		return sendError(event,createError({
			statusCode:401,
			statusMessage:'The user is unauthorized'
		}))
	}
	const decoded = decodeAccessToken(token)
	if(!decoded){
		return sendError(event,createError({
			statusCode:401,
			statusMessage:'The token is not valid'
		}))
	}

	
	try {
		const userId = decoded.userId
		const user =await getUserById(userId);

		event.context.auth = {user}
	} catch (error) {
		return
	}
})