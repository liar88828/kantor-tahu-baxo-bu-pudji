import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from "@/server/lib/jwt";
import { updateSession } from "@/server/lib/db";
// import { updateSession } from "@/app/lib/state";

// 1. Specify protected and public routes
const protectedRoutes = [ '/dashboard', '/admin', '/profile', '/trolley' ]
const publicRoutes = [ '/login', '/signup', ]

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname
	const isProtectedRoute = protectedRoutes.includes(path)
	const isPublicRoute = publicRoutes.includes(path)

	// 3. Decrypt the session from the cookie
	const cookie = (await cookies()).get('session')?.value
	const session = await decrypt(cookie)
    // console.log(cookie)
    // console.log(session)
	// 4. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !session?.sessionId) {
		return NextResponse.redirect(new URL('/login', req.nextUrl))
	}

	if (path.includes('admin') && !session?.sessionId) {
		return NextResponse.redirect(new URL('/login', req.nextUrl))
	}

	// 5. Redirect to /dashboard if the user is authenticated
	if (
		isPublicRoute &&
		session?.sessionId &&
        !req.nextUrl.pathname.startsWith('/home')
	) {
        return NextResponse.redirect(new URL('/home', req.nextUrl))
	}

    // await updateSession(req)
	// return NextResponse.next()
	return await updateSession(req)
}
// Routes Middleware should not run on
export const config = {
	matcher: [ '/((?!api|_next/static|_next/image|.*\\.png$).*)' ],
}