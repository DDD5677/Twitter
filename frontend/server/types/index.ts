export type User={
	id?:string|null,
	username:string,
	password:string,
	email:string,
	name?:string|null,
	profileImage?:string|null,
	createdAt?:Date|null,
	updatedAt?:Date|null,
	refreshToken?:string|null|undefined,
}

export type RefreshToken={
	token:string,
	userId:string,
	createdAt?:string,
	updatedAt?:string,
}