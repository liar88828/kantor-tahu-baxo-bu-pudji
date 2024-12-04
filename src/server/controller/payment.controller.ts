import {InterfaceController} from "@/interface/server/InterfaceController"
import {TPaymentDB} from "@/entity/payment.model"
import {NextRequest} from "next/server"
import {TContext} from "@/interface/server/param"
import {PaymentRepository} from "@/server/repository/payment.repo"
import {getId, getJson, getParams} from "@/lib/requestHelper"
import {UUIDSchema} from "@/validation/id.valid"
import {PaymentCreate} from "@/validation/payment.valid"

export default class PaymentController
  implements InterfaceController<TPaymentDB>
{
  constructor(private paymentRepository: PaymentRepository) {}

  async findAll(request: NextRequest, __: TContext): Promise<any> {
    return this.paymentRepository.findAll({
      address: getParams(request, "address"),
      type: getParams(request, "type"),
      name: getParams(request, "name"),
    })
  }

  async findById(_: NextRequest, context: TContext) {
    const id = await getId(context)
    return this.paymentRepository.findById(UUIDSchema.parse(id))
  }

  async createOne(request: NextRequest, _: TContext) {
    const json = await getJson(request)
    return this.paymentRepository.createOne(PaymentCreate.parse(json))
  }

  async updateOne(request: NextRequest, context: TContext) {
    const json = await getJson(request)
    const id = await getId(context)
    return this.paymentRepository.updateOne(
      PaymentCreate.parse(json),
      UUIDSchema.parse(id)
    )
  }

  async deleteOne(_: NextRequest, context: TContext) {
    const id = await getId(context)
    return this.paymentRepository.deleteOne(UUIDSchema.parse(id))
  }
}
