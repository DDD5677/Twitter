<template>
	<nuxt-link to="#"
		class="flex items-center p-3 rounded-full w-min text-black hover:bg-gray-200 defaultTransition dark:hover:bg-dim-200 dark:text-white">
		<div class="w-6 h-6 text-dark">
			<slot name="icon"></slot>

		</div>
		<div class="hidden ml-4 text-xl xl:block" :class="textClasses">
			<slot name="name"></slot>

		</div>
	</nuxt-link>
</template>

<script setup>
const props = defineProps({
	active: {
		type: Boolean,
		default: false
	}
})

const textClasses = computed(() => props.active ? 'font-semibold' : 'font-normal')
</script>

<style lang="scss" scoped></style>