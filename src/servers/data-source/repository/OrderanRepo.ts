import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import { TPOrderan } from '@/servers/data-source/prisma/config';
import { IOrderanRepo } from '@/servers/data-source/interface/repository/IOrderanRepo';
import AbstractRepo from '@/servers/data-source/repository/AbstractRepo';

type TYPE = TPOrderan

export class OrderanRepo extends AbstractRepo<"orderan"> implements IOrderanRepo {

  constructor( public data: IOrderanData<TYPE> ) {super()}

  async createOne( data: TYPE ): Promise<TYPE> {
    const res = await this.data.createOne( data )
    console.log( res )
    return res
  }

  async findAll(): Promise<TYPE[]> {
    return this.data.findAll()
  }

  async findOne( id: string ): Promise<TYPE> {
    return this.data.findById( id )
  }

  async deleteOne( id: string ): Promise<TYPE> {
    return this.data.destroyOne( id )
  }

  async updateOne( id: string, data: TYPE ): Promise<TYPE> {
    return this.data.updateOne( data, id )
  }

}