<template>
	<div>
		<div v-if="isEmptyArray" class="p-4">
			<p class="text-center text-gray-500">
				Not tweets 😢
			</p>
		</div>
		<div v-else>

			<div v-for="tweet in props.tweets" :key="tweet.id" @click.native="redirect(tweet?.id)"
				class="pb-4 border-b twitterBorderColor defaultTransition hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300">
				<TweetItem :tweet="tweet" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Tweet } from '~/types';

type Props = {
	tweets: Tweet[]
}
const props = defineProps<Props>()

const isEmptyArray = computed(() => props.tweets.length === 0)
function redirect(tweetId: string | undefined) {
	navigateTo(`/status/${tweetId}`)
}
</script>

<style scoped></style>