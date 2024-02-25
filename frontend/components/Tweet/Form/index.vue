<template>
	<div>
		<div v-if="loading" class="flex justify-center items-center py-6">
			<UISpinner />
		</div>

		<div v-else>
			<TweetItem v-if="props.replyTo && props.showReply" compact hideActions :tweet="props.replyTo" />
			<TweetFormInput :placeholder="placeholder" :user="props.user" @onSubmit="handleFormSubmit" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Tweet, User } from '~/types';
const emits = defineEmits(['onSuccess'])
const loading = ref(false)
const { postTweet } = useTweets()
const props = defineProps({
	user: {
		type: Object as PropType<User | null>,
		required: true
	},
	placeholder: {
		type: String as PropType<string>,
		required: true
	},
	replyTo: {
		type: Object as PropType<Tweet | null>,
		default: null
	},
	showReply: {
		type: Boolean,
		default: false
	}
})
const handleFormSubmit = async (data: any) => {
	loading.value = true
	try {
		const response: any = await postTweet({
			text: data.text,
			images: data.images,
			replyTo: props.replyTo?.id
		})
		emits('onSuccess', response.tweet)
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}
</script>

<style scoped></style>