import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import { TPOrderan as TYPE } from '@/servers/data-source/prisma/config';
import { IOrderanRepo } from '@/servers/interface/repository/IOrderanRepo';

export class OrderanRepo implements IOrderanRepo {

  constructor( public data: IOrderanData<TYPE> ) {}

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