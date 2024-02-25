import { getUserByUsername } from "~/server/db/users"
import bcrypt from 'bcrypt'
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt"
import { userTransformer } from "~/server/transformers/user"
import { User } from "~/types"
import { createRefreshToken } from "~/server/db/refreshTokens"

export default defineEventHandler(async(event)=>{
	const body = await readBody(event)

	const {username,password}=body

	if(!username||!password){
		return sendError(event,createError({
			statusCode:400,
			statusMessage:'Invalid params'
		}))
	}

	//Is the user registered or not
	const user:(User|null) = await getUserByUsername(username);

	if(!user){
		return sendError(event,createError({
			statusCode:400,
			statusMessage:'Username or password is invalid'
		}))
	}
	//Compare passwords
	const passwordMatch = await bcrypt.compare(password,user.password)

	if(!passwordMatch){
		return sendError(event,createError({
			statusCode:400,
			statusMessage:'Username or password is invalid'
		}))
	}
	//Generate tokens
	//Access token
	//Refresh token
	const {accessToken, refreshToken} = generateTokens(user)

	//save it inside db
	await createRefreshToken({
		token:refreshToken,
		userId:user.id?user.id:''
	})
	//Add http only cookie
	sendRefreshToken(event,refreshToken)


	return {
		user:userTransformer(user),
		accessToken
	}
})