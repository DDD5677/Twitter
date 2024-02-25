<template>
	<div>
		<MainSection title="Tweet" :loading="loading">

			<Head>
				<Title>Tweet</Title>
			</Head>
			<TweetDetails :user="user" :tweet="tweet" />
		</MainSection>
	</div>
</template>

<script setup lang="ts">
import type { Tweet, User } from '~/types';

const tweet = ref<Tweet | null>(null)
const loading = ref(false)
const { useAuthUser } = useAuth()
const user = useAuthUser()
const { getTweetById } = useTweets()
function getTweetIdFromRoute() {
	return useRoute().params.id as string
}
async function getTweet() {
	loading.value = true;
	try {
		const response: any = await getTweetById(getTweetIdFromRoute())
		tweet.value = response.tweet
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}
onBeforeMount(() => {
	getTweet()
})
</script>

<style scoped></style>