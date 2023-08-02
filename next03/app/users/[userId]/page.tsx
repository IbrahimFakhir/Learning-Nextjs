import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUserPosts"
import { Suspense } from "react"
import UserPosts from "./components/UserPosts"
import type { Metadata } from "next"


type Params = {
	params: {
		userId: string
	}
}

export async function generateMetadata({ params: { userId } }: Params) : Promise<Metadata> {
	const userData: Promise<User> = getUser(userId)
	const user: User = await userData

	return {
		title: user.name,
		description: `This is the page of ${user.name}`
	}
}

export default async function UserPage({ params: { userId } }: Params) {
	const userData: Promise<User> = getUser(userId)
	const userPostData: Promise<Post[]> = getUserPosts(userId)

	// also a valid approach, but without suspense
	// const [user, userPosts] = await Promise.all([userData, userPostData])

	const user = await userData

	return (
		<>
			<h2>{user.name}</h2>
			<br />
			<Suspense fallback={<h2>Loading...</h2>}>
				<UserPosts promise={userPostData} />
			</Suspense>
		</>
	)
}
