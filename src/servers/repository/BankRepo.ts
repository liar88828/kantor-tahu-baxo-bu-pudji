import { TPBank as TYPE } from '@/servers/data-source/prisma/config';
import { IBankData } from '@/servers/data-source/interface/prisma/Bank';
import { IBankRepo } from '@/servers/interface/repository/IBankRepo';

export class BankRepo implements IBankRepo {

  constructor( public data: IBankData<TYPE> ) {}

  async createOne( data: TYPE ): Promise<TYPE> {
    return this.data.createOne( data )
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