export type User={
	id?:string|null,
	username:string,
	password:string,
	email:string,
	name?:string|null,
	profileImage?:string|null,
	handle?:string,
	createdAt?:Date|null,
	updatedAt?:Date|null,
	refreshToken?:string|null|undefined,
}
export type mediaFiles = {
	id?:string,
	url:string
}
export type Tweet={
	id?:string,
	text:string,
	authorId:string,
	replyToId?:string|null,
	mediaFiles?:mediaFiles[]|null,
	author?:User|null,
	replies?:Tweet[]|null,
	repliesCount?:number,
	replyTo?:Tweet|null,
	postedAtHuman?:string,
	createdAt?:Date|null,
	updatedAt?:Date|null,
}
export type RefreshToken={
	token:string,
	userId:string,
	createdAt?:string,
	updatedAt?:string,
}