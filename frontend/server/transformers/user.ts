import { User } from "../../types"

export const userTransformer = (user:User)=>{
	return {
		id:user.id,
		name:user.name,
		email:user.email,
		username:user.username,
		profileImage:user.profileImage,
		handle:'@'+user.username
	}
}