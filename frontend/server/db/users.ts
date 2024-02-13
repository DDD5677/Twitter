import { User } from "../types"
import {prisma} from "./index"
import bcrypt from 'bcrypt'
export const createUser = (userData:User)=>{
	const finalUserData:any = {
		...userData,
		password:bcrypt.hashSync(userData.password,10)
	}

	return prisma.user.create({
		data:finalUserData
	})
}

export const getUserByUsername = (username:string)=>{
	return prisma.user.findUnique({
		where:{
			username
		}
	})
}