import { prisma, TPBank } from '@/servers/data-source/prisma/config';
import { TUPDATEBANK } from '@/lib/validation/zod/updateZod';
import { TCREATEBANK } from '@/lib/validation/zod/createZod';

type TYPE = TPBank

export class BankRepo {

  static async findPaginate( page: number, take: number ) {
    return prisma.bank.findMany( { take: take, skip: ( page - 1 ) * take } )
  }
  static async findCount() {return prisma.bank.count()}
  static async deleteOne( id: string ) {
    return prisma.bank.delete( { where: { id } } )
  }
  async createOne( data: TCREATEBANK ): Promise<TYPE> {
    return prisma.bank.create( { data: { ...data } } )
  }
  async findAll(): Promise<TYPE[]> {
    return prisma.bank.findMany()
  }
  async findOne( id: string ) {
    return prisma.bank.findUnique( { where: { id } } )
  }
  async deleteOne( id: string ): Promise<TYPE> {return BankRepo.deleteOne( id )}

  async updateOne( data: TUPDATEBANK, id: string, ): Promise<TYPE> {
    return prisma.bank.update( { data: { ...data }, where: { id: id } } )
  }

}