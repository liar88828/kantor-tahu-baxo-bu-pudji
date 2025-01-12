import { NextRequest } from "next/server";
import { getSession } from "@/server/lib/db";
import { ErrorResponse } from "@/utils/ErrorResponse";
import { decrypt } from "@/server/lib/jwt";
import { ROLE } from "@/interface/Utils";

export async function authApi(request: NextRequest, isAdmin: boolean = false) {
    const fromSession = await getSession()
    if (!fromSession) {
        const fromHeader = request.headers.get('authorization')
        if (!fromHeader) {
            throw new ErrorResponse('No token provided', 401)
        }
        const token = fromHeader.split(' ').pop()
        const validToken = await decrypt(token)
        // console.log(validToken)
        if (validToken) {
            validToken.role = ROLE.ADMIN
            throw new ErrorResponse('is Secure Admin Only', 401)
        }
        return validToken
    }
    if (isAdmin) {
        fromSession.role = ROLE.ADMIN
        throw new ErrorResponse('is Secure Admin Only', 401)
    }
    return fromSession
}