import { NextResponse } from "next/server";
import { testRepositories } from "@/server/repository/test.repo";

export async function GET() {
	return NextResponse.json({ data: await testRepositories.getMonthlyTotal() })

}

export async function POST() {
    const data = await testRepositories.seedOrder()
	return NextResponse.json(data)

}
