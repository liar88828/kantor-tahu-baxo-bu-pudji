'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt, encrypt, expires } from "@/app/lib/jwt";

export async function deleteSession() {
	const cookieStore = await cookies()
	cookieStore.delete('session')
}

export async function updateSession() {
	const session = (await cookies()).get('session')?.value
	const payload = await decrypt(session)

	if (!session || !payload) {
		return null
	}

	const cookieStore = await cookies()
	cookieStore.set({
		name: 'session',
		value: session,
		httpOnly: true,
		expires: expires,
		// secure: true,
		// sameSite: 'lax',
		// path: '/',
	})
	// console.log(' is validate')
}

export async function createSession(userId: string) {
	const expiresAt = expires
	const session = await encrypt({ sessionId: userId, expiresAt })
	const cookieStore = await cookies()

	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
}

export async function logout() {
	await deleteSession()
	redirect('/login')
}