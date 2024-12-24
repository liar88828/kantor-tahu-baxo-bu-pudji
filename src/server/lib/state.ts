'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt, encrypt } from "@/server/lib/jwt";
import { Sessions } from ".prisma/client";

export async function deleteSession() {
	const cookieStore = await cookies()
	cookieStore.delete('session')
}

export async function updateSession() {
    const expires = new Date(Date.now() + 60 * 60 * 1000)
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

export async function createSession(data: Pick<Sessions, 'usersId' | 'role'>) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    const session = await encrypt({ sessionId: data.usersId, expiresAt, role: data.role })
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