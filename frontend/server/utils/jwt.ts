import jwt from 'jsonwebtoken'
import { User } from '../types'

const generateAccessToken = (user:User)=>{
	const config = useRuntimeConfig()

	return jwt.sign({userId:user.id},config.accessTokenSecret,{
		expiresIn:'10m'
	})
}
const generateRefreshToken = (user:User)=>{
	const config = useRuntimeConfig()

	return jwt.sign({userId:user.id},config.refreshTokenSecret,{
		expiresIn:'4h'
	})
}

export const generateTokens = (user:User) => {
	const accessToken = generateAccessToken(user)
	const refreshToken = generateRefreshToken(user)
   return {
      accessToken: accessToken,
      refreshToken: refreshToken,
   };
};

export const sendRefreshToken = (event:any,token:string)=>{
	setCookie(event,"refreshToken",token,{
		httpOnly:true,
		sameSite:true
	})
}
