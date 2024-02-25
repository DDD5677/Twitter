<template>
	<div>
		<TweetItem compact :tweet="props.tweet" />
		<TweetForm @onSuccess="handleFormSuccess" :user="user" :reply-to="props.tweet" placeholder="Tweet your reply" />
		<TweetListFeed :tweets="replies" />
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Tweet, User } from '~/types';

const props = defineProps({
	tweet: {
		type: Object as PropType<Tweet | null>,
		required: true
	},
	user: {
		type: Object as PropType<User>,
		required: true
	}
})

const replies = computed(() => {
	return props.tweet?.replies || []
})

const handleFormSuccess = (tweet: Tweet) => {
	navigateTo({
		path: `/status/${tweet.id}`
	})
}
</script>

<style scoped></style>