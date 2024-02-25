<template>
	<div class="w-full">
		<div class="flex justify-center">
			<div class="w-10 h-10">
				<LogoTwitter />
			</div>
		</div>
		<div class="pt-5 space-y-5">
			<UIInput label="Username" placeholder="@username" v-model="data.username" />
			<UIInput label="Password" placeholder="*********" type="password" v-model="data.password" />
			<div>
				<UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">Login</UIButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { login } = useAuth()

const data = reactive({
	username: '',
	password: '',
	loading: false
})

const handleLogin = async () => {
	data.loading = true
	try {
		await login({
			username: data.username,
			password: data.password
		})
	} catch (error) {
		console.log(error)
	} finally {
		data.loading = false
	}
}
const isButtonDisabled = computed(() => !data.username || !data.password || (data.loading))
</script>

<style scoped></style>