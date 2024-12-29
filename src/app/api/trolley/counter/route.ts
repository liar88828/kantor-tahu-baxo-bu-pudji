import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/utils/requestHelper";
import { trolleyController } from "@/server/controller";
import { updateSession } from "@/server/lib/state";

export async function GET(request: NextRequest, context: TContext) {
    await updateSession()

	return await ResponseJson(
		async () => trolleyController.count(request, context),
		"GET",
		"trolley"
	)
}
