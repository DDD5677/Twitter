<template>
	<div>
		<MainSection title="Search" :loading="loading">

			<Head>
				<Title>Search</Title>
			</Head>

			<TweetListFeed :tweets="searchTweets" />
		</MainSection>
	</div>
</template>

<script lang="ts" setup>
const { getTweets } = useTweets()
const loading = ref(false)
const searchTweets = ref([])
const searchQuery = computed(() => useRoute().query.q)
watch(() => searchQuery.value, () => getSearchTweets())
onBeforeMount(() => {
	getSearchTweets()
})
async function getSearchTweets() {
	loading.value = true
	try {
		const tweets: any = await getTweets({
			query: searchQuery.value
		})
		searchTweets.value = tweets
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}
</script>

<style lang="scss" scoped></style>