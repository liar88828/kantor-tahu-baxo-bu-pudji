import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/lib/requestHelper";
import { trolleyController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => trolleyController.count(request, context),
		"GET",
		"trolley"
	)
}
