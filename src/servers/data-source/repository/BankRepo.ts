import { TPBank } from '@/servers/data-source/prisma/config';
import { IBankData } from '@/servers/data-source/interface/prisma/Bank';
import { IBankRepo } from '@/servers/data-source/interface/repository/IBankRepo';
import AbstractRepo from '@/servers/data-source/repository/AbstractRepo';
// import { overrides } from 'chart.js/dist/core/core.defaults';

type TYPE = TPBank

export class BankRepo extends AbstractRepo<"bank"> implements IBankRepo {

  constructor( public data: IBankData<TYPE> ) {super()}

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