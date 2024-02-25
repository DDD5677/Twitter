import type { Tweet } from "~/types"

export default ()=>{
	const usePostTweetModal = ()=>useState('post_tweet_modal',()=>false)
	const useReplyTweet=()=>useState<Tweet|null>('reply_tweet',()=>null)

	const closePostTweetModal=()=>{
		const postTweetModal = usePostTweetModal()
		postTweetModal.value = false
	}

	const setReplyTo = (tweet:Tweet|null)=>{
		const replyTweet = useReplyTweet();
		replyTweet.value = tweet
	}

	const openPostTweetModal=(tweet:Tweet|null=null)=>{
		const postTweetModal = usePostTweetModal()
		postTweetModal.value = true

		setReplyTo(tweet)
	}

	const postTweet = (formData:any)=>{
		const form = new FormData()

		form.append('text',formData.text)
		form.append('replyTo',formData.replyTo)
		formData.images.forEach((image:any,index:number) => {
			form.append('image_'+index,image)
		});
		return useFetchApi('/api/user/tweets',{
			method:'POST',
			body:form
		})
	}
	const getTweets = (params:any={})=>{
		return new Promise(async (resolve,reject)=>{
			try {
				const response:any = await useFetchApi('/api/tweets',{
					method:'GET',
					params
				})
				resolve(response.tweets)
			} catch (error) {
				reject(error)
			}
		})
	}

	const getTweetById = (tweetId:string)=>{
		return new Promise(async(resolve,reject)=>{
			try {
				const response = await useFetchApi(`/api/tweets/${tweetId}`)
				resolve(response)
			} catch (error) {
				reject(error)
			}
		})
	}


	return{
		postTweet,
		getTweets,
		getTweetById,
		closePostTweetModal,
		usePostTweetModal,
		openPostTweetModal,
		useReplyTweet
	}
}