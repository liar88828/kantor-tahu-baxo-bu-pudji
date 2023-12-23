import { prisma, TPTravel } from '@/servers/data-source/prisma/config';
import { TCREATEDELIVER } from '@/lib/validation/zod/createZod';
import { TUPDATEDELIVER } from '@/lib/validation/zod/updateZod';

type TYPE = TPTravel

export class DeliveryRepo {

  public data = prisma.delivery

  async createOne( data: TCREATEDELIVER ): Promise<TYPE> {
    return this.data.create( { data: { ...data } } )
  }

  async findAll(): Promise<TYPE[]> {
    return this.data.findMany()
  }

  async findOne( id: string ) {
    return this.data.findUnique( { where: { id } } )
  }

  async deleteOne( id: string ): Promise<TYPE> {
    return this.data.delete( { where: { id } } )
  }

  async updateOne( data: TUPDATEDELIVER, id: string, ): Promise<TYPE> {
    return this.data.update( { data: { ...data }, where: { id: id } } )
  }
}