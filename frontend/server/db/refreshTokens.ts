import { prisma } from "."
import { RefreshToken } from "../types"

export const createRefreshToken = (refreshToken:RefreshToken) =>{
	return prisma.refreshToken.create({
		data:refreshToken
	})
}