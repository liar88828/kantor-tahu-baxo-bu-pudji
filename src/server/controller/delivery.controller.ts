import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import DeliveryRepository from "@/server/repository/delivery.repo"
import { getId, getJson, getParams } from "@/lib/requestHelper"
import { UUIDSchema } from "@/validation/id.valid"
import { DeliveryCreate } from "@/validation/delivery.valid"

export default class DeliveryController
	implements InterfaceController {
	constructor(private deliveryRepository: DeliveryRepository) {

	}

  async findAll(request: NextRequest, __: TContext): Promise<any> {
    return this.deliveryRepository.findAll({
      address: getParams(request, "address"),
      type: getParams(request, "type"),
      name: getParams(request, "name"),
    })
  }

  async findById(_: NextRequest, context: TContext) {
    const id = await getId(context)
    return this.deliveryRepository.findById(UUIDSchema.parse(id))
  }

  async createOne(request: NextRequest, __: TContext) {
    const json = await request.json()
    return this.deliveryRepository.createOne(DeliveryCreate.parse(json))
  }

  async updateOne(request: NextRequest, context: TContext) {
    const json = await getJson(request)
    const id = await getId(context)
    return this.deliveryRepository.updateOne(
      DeliveryCreate.parse(json),
      UUIDSchema.parse(id)
    )
  }

  async deleteOne(_: NextRequest, context: TContext) {
    const id = await getId(context)
    const res = await this.deliveryRepository.deleteOne(UUIDSchema.parse(id))
    // if (res) {
    // 	await fileSystem(res.img)
    // }
    return res
  }
}
