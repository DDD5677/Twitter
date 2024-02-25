<template>
	<div>
		<MainSection title="Home" :loading="loading">

			<Head>
				<Title>Home / Twitter</Title>
			</Head>
			<div class="border-b twitterBorderColor">
				<TweetForm @on-success="handleFormSuccess" :user="user" :placeholder="`What's happening?`" />

			</div>
			<TweetListFeed :tweets="homeTweets" />
		</MainSection>
	</div>
</template>

<script lang="ts" setup>
import type { Tweet } from '~/types';

const { getTweets } = useTweets()
const loading = ref(false)
const homeTweets = ref([])
const { useAuthUser } = useAuth()
const user: any = useAuthUser()

function handleFormSuccess(tweet: Tweet) {
	navigateTo({
		path: `/status/${tweet.id}`
	})
}


onBeforeMount(async () => {
	loading.value = true
	try {
		const tweets: any = await getTweets()
		homeTweets.value = tweets
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
})

</script>

<style lang="scss" scoped></style>