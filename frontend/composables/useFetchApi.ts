export default (url:string,options={})=>{
	const {useAuthToken}=useAuth()
	return $fetch(url,{
		...options,
		headers:{
			...options,
			Authorization:`Bearer ${useAuthToken().value}`
		}
	})
}