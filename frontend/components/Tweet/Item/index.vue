<template>
	<div>
		<TweetItemHeader :tweet="props.tweet" />

		<div :class="tweetBodyWrapper">
			<p :class="textSize" class="flex-shrink w-auto font-medium text-gray-800 dark:text-white">
				{{ props.tweet?.text }}
			</p>
			<div v-for="image in tweet?.mediaFiles" :key="image.id"
				class="flex my-3 mr-2 twitterBorderColor border-2 rounded-2xl">
				<img :src="image.url" alt="" class="w-full rounded-2xl">
			</div>
			<div v-if="!props.hideActions" class="mt-2">
				<TweetItemActions @on-comment-click="handleCommentClick" :tweet="props.tweet" :compact="props.compact" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Tweet } from '~/types';

const emitter = useEmitter()

const props = defineProps({
	tweet: {
		type: Object as PropType<Tweet | null>,
		required: true
	},
	compact: {
		type: Boolean,
		default: false
	},
	hideActions: {
		type: Boolean,
		default: false
	}
})

const tweetBodyWrapper = computed(() => {
	return props.compact ? 'ml-2' : 'ml-16'
})
const textSize = computed(() => props.compact ? 'text-2xl' : 'text-base')

function handleCommentClick() {
	emitter.$emit('replyTweet', props.tweet)
}

</script>

<style scoped></style>