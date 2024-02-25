<template>
	<div @click.stop.prevent="emits('onClick')" class="flex items-center text-gray-400 cursor-pointer group">
		<div
			:class="`p-2 rounded-full defaultTransition group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20`">
			<slot name="icon" :classes="`w-${props.size} h-${props.size}`"></slot>
		</div>
		<span :class="`ml-1 group-hover:text-${props.color}-400`">
			<slot name="default"></slot>
		</span>
	</div>
</template>

<script setup lang="ts">
const emits = defineEmits(['onClick'])
const props = defineProps({
	color: {
		type: String as PropType<string>,
		required: true
	},
	size: {
		type: Number,
		default: 5
	}
})

</script>

<style scoped></style>