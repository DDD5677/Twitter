import { Tweet } from '~/types'
import {prisma} from '.'

export const createTweet = (tweetData:Tweet)=>{
	return prisma.tweet.create({
		data:tweetData as any 
	})
}

export const getTweets = (params:any={})=>{
	return prisma.tweet.findMany({
		...params
	})
}

export const getTweetsById = (tweetId:string,params:any={})=>{
	return prisma.tweet.findUnique({
		...params,
		where:{
			...params.where,
			id:tweetId
		},
	})
}