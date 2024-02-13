import { sendError } from "h3";
import {createUser} from "../../db/users"
import { userTransformer } from "~/server/transformers/user";
import { User } from "~/server/types";
export default defineEventHandler(async (event) => {
   const body = await readBody(event);
   const { username, email, password, repeatPassword, name } = body;
   if (!username || !email || !password || !repeatPassword || !name) {
      return sendError(
         event,
         createError({
            statusCode: 400,
            statusMessage: "Invalid params",
         })
      );
   }
	if(password!==repeatPassword){
		return sendError(
         event,
         createError({
            statusCode: 400,
            statusMessage: "Password do not match",
         })
      );
	}
	const userData:User={
		username,
		email,
		password,
		name,
		profileImage:'https://picsum.photos/200/200'
	}
	const user:User = await createUser(userData)
   return {
      body: userTransformer(user)
   };
});
