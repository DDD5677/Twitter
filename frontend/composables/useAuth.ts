import type { User } from "~/types"
import useFetchApi from "./useFetchApi"
import { jwtDecode } from "jwt-decode";
type loginData={
	username:string,
	password:string
}

export default ()=>{
	const useAuthToken = ()=>useState<string|null>('auth_token')
	const useAuthUser = ()=>useState<User|null>('auth_user')
	const useAuthLoading = ()=>useState('auth_loading',()=>true)
	const setToken=(newToken:string|null)=>{
		const authToken = useAuthToken()
		authToken.value = newToken
	}
	const setUser=(newUser:User|null)=>{
		const authUser = useAuthUser()
		authUser.value = newUser
	}
	const setAuthLoading=(value:boolean)=>{
		const authLoading = useAuthLoading()
		authLoading.value = value
	}

	const login = ({username,password}:loginData)=>{
		return new Promise(async(resolve,reject)=>{
			try {
				const data:any = await $fetch('/api/auth/login',{
					method:'POST',
					body:{
						username,
						password
					}
				})
				setToken(data.accessToken)
				setUser(data.user)
				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}

	const refreshToken = ()=>{
		return new Promise (async (resolve,reject)=>{
			try {
				const data = await $fetch('/api/auth/refresh')
				setToken(data.accessToken)
				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}
	const getUser = ()=>{
		return new Promise (async (resolve,reject)=>{
			try {
				const data:any = await useFetchApi('/api/auth/user')
				setUser(data.user)
				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}
	const reRefreshAccessToken = ()=>{
		const authToken = useAuthToken()
		if(!authToken.value){
			return
		}
		const jwt = jwtDecode(authToken.value as string)
		if(!jwt.exp)return
		 const newRefreshTime = jwt.exp-60000
		 setTimeout(async()=>{
			 await refreshToken()
			 reRefreshAccessToken()
		 },newRefreshTime)
		
	}

	const initAuth = ()=>{
		return new Promise (async (resolve,reject)=>{
			setAuthLoading(true)
			try {
				await refreshToken()
				await getUser()

				reRefreshAccessToken()

				resolve(true)
			} catch (error) {
				reject(error)
			}finally{
				setAuthLoading(false)
			}
		})
	}

	const logout=()=>{
		return new Promise(async (resolve,reject)=>{
			try {
				await useFetchApi('/api/auth/logout',{
					method:'POST'
				})
				setToken(null);
				setUser(null);
				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}

	return {
		login,
		useAuthUser,
		initAuth,
		useAuthToken,
		useAuthLoading,
		logout
	}
}