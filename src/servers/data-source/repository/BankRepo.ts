import { prisma, TPBank } from '@/servers/data-source/prisma/config';
import { TUPDATEBANK } from '@/lib/validation/zod/updateZod';
import { TCREATEBANK } from '@/lib/validation/zod/createZod';

type TYPE = TPBank

export class BankRepo {

  public data = prisma.bank

  async createOne( data: TCREATEBANK ): Promise<TYPE> {
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

  async updateOne( data: TUPDATEBANK, id: string, ): Promise<TYPE> {
    return this.data.update( { data: { ...data }, where: { id: id } } )
  }

}