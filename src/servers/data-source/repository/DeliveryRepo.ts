import { prisma, TPTravel } from '@/servers/data-source/prisma/config';
import { TCREATEDELIVER } from '@/lib/validation/zod/createZod';
import { TUPDATEDELIVER } from '@/lib/validation/zod/updateZod';

type TYPE = TPTravel

export class DeliveryRepo {

  static async findCount() {return prisma.delivery.count()}
  static async findPaginate( page: number, take: number ) {
    return prisma.delivery.findMany( { take: take, skip: ( page - 1 ) * take } )
  }
  async createOne( data: TCREATEDELIVER ): Promise<TYPE> {
    return prisma.delivery.create( { data: { ...data } } )
  }
  async findAll(): Promise<TYPE[]> {
    return prisma.delivery.findMany()
  }
  async findOne( id: string ) {
    return prisma.delivery.findUnique( { where: { id } } )
  }

  async deleteOne( id: string ): Promise<TYPE> {
    return prisma.delivery.delete( { where: { id } } )
  }

  async updateOne( data: TUPDATEDELIVER, id: string, ): Promise<TYPE> {
    return prisma.delivery.update( { data: { ...data }, where: { id: id } } )
  }
}