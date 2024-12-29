import { NextResponse } from "next/server";
import { testRepositories } from "@/server/repository/test.repo";

export async function POST() {
	const data = testRepositories.seedProduct()
	return NextResponse.json(data)
}
