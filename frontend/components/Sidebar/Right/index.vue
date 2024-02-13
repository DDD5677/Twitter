<template>
	<div class="flex flex-col">
		<!--Preview card: What's happening-->
		<SidebarRightPreviewCard title="What's happening">
			<SidebarRightPreviewCardItem v-for="(whatsHappening, index) in whatsHappeningItems" :key="index">
				<div>
					<h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>
					<p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>
		<!--Preview card: Who to follow-->
		<SidebarRightPreviewCard title="Who to follow">
			<SidebarRightPreviewCardItem v-for="(whoToFollow, index) in whoToFollowItems" :key="index">
				<div class="flex justify-between items-center p-2">
					<div class="flex">
						<img class="w-10 h-10 rounded-full" :src="whoToFollow.image" :alt="whoToFollow.name">

						<div class="flex flex-col ml-2">
							<h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
							<p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
						</div>

					</div>
					<div class="flex  h-full">
						<button
							class="rounded-full px-4 py-2 text-xs font-bold text-white bg-black dark:text-black dark:bg-white">Follow</button>
					</div>

				</div>

			</SidebarRightPreviewCardItem>

		</SidebarRightPreviewCard>
	</div>
</template>

<script setup>
const whatsHappeningItems = ref([
	{
		title: 'SpaceX',
		count: '18.8k Tweets'
	},
	{
		title: '#CodingIsFun',
		count: '8.4k Tweets'
	},
	{
		title: 'Soul',
		count: '48.8k Tweets'
	},
	{
		title: 'News',
		count: '64.5k Tweets'
	},
])
const whoToFollowItems = ref([
	{
		name: 'Ilon Mask',
		handle: '@IlonMask',
		image: 'https://picsum.photos/200/200'
	},
	{
		name: 'Joe Biden',
		handle: '@JoeBiden',
		image: 'https://picsum.photos/200/200'
	},
	{
		name: 'Trump',
		handle: '@Trump',
		image: 'https://picsum.photos/200/200'
	},
])
</script>

<style lang="scss" scoped></style>