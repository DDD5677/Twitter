import formidable from "formidable"
import { createMediaFile } from "~/server/db/mediaFiles"
import { createTweet } from "~/server/db/tweets"
import { tweetTransformer } from "~/server/transformers/tweet"
import { uploadToCloudinary } from "~/server/utils/cloudinary"
export default defineEventHandler(async (event)=>{

	const form =formidable({})
	const response:any =await new Promise((resolve,reject)=>{
		form.parse(event.node.req,(err,fields,files)=>{
			if(err){
				reject(err)
			}
			resolve({fields,files})
		})

	})
	type TweetData = {
		text:string,
		authorId:string,
		replyToId?:string
	}
	const {fields,files}=response
	const userId:string = event.context?.auth?.user?.id;
	const tweetData:TweetData = {
		text:fields.text[0]as string,
		authorId:userId
	}
	const replyTo:string = fields.replyTo?fields.replyTo[0]:null;
	if(replyTo&&replyTo!=='null'&&replyTo!=='undefined'){
		tweetData.replyToId=replyTo
	}
	const tweet = await createTweet(tweetData)
	const filePromises = Object.keys(files).map(async (key:any)=>{
		const cloudinaryResource:any = await uploadToCloudinary(files[key][0].filepath)
		
		return createMediaFile({
			url:cloudinaryResource.secure_url,
			providerPublicId:cloudinaryResource.public_id,
			userId:userId,
			tweetId:tweet.id
		})
	})
	await Promise.all(filePromises)
	
	return {
		tweet:tweetTransformer(tweet)
	}
})