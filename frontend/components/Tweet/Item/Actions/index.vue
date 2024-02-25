<template>
	<div class="flex items-center justify-around w-full">
		<TweetItemActionsIcon color="blue" @on-click="emits('onCommentClick')" :size="size">
			<template v-slot:icon="{ classes }">
				<ChatBubbleOvalLeftEllipsisIcon :class="classes" />
			</template>
			<template v-if="showStats" v-slot:default>
				<span>
					{{ props.tweet?.repliesCount }}
				</span>
			</template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="green" :size="size">
			<template v-slot:icon="{ classes }">
				<ArrowPathIcon :class="classes" />
			</template>
			<template v-if="showStats" v-slot:default>
				<span>
					{{ generateRandomNumber() }}
				</span>
			</template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="red" :size="size">
			<template v-slot:icon="{ classes }">
				<HeartIcon :class="classes" />
			</template>
			<template v-if="showStats" v-slot:default>
				<span>
					{{ generateRandomNumber() }}
				</span>
			</template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="blue" :size="size">
			<template v-slot:icon="{ classes }">
				<ArrowUpTrayIcon :class="classes" />
			</template>
			<template v-if="showStats" v-slot:default>
				<span>
					{{ generateRandomNumber() }}
				</span>
			</template>
		</TweetItemActionsIcon>
	</div>
</template>

<script setup lang="ts">
import type { Tweet } from '~/types';
import { ChatBubbleOvalLeftEllipsisIcon, ArrowPathIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
const emits = defineEmits(['onCommentClick'])
const props = defineProps({
	tweet: {
		type: Object as PropType<Tweet | null>,
		required: true
	},
	compact: {
		type: Boolean,
		default: false
	}
})

const showStats = computed(() => !props.compact)
const size = computed(() => props.compact ? 8 : 5)
function generateRandomNumber() {
	return Math.floor(Math.random() * 100)
}
</script>

<style scoped></style>