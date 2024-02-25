import { getTweetsById } from "~/server/db/tweets"
import { tweetTransformer } from "~/server/transformers/tweet"

export default defineEventHandler(async(event)=>{

	const params = event.context.params
	if(!params?.id)return
	const tweet = await getTweetsById(params?.id,{
		include:{
			author:true,
			mediaFiles:true,
			replyTo:{
				include:{
					author:true
				}
			},
			replies:{
				include:{
					mediaFiles:true,
					author:true,
					replyTo:{
						include:{
							author:true
						}
					},
				}
			},
		}
	})
	return{
		tweet:tweetTransformer(tweet)
	}
})