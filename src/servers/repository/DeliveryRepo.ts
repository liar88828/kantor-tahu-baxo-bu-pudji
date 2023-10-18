import { TPTravel as TYPE } from '@/servers/data-source/prisma/config';
import { ITravelData } from '@/servers/data-source/interface/prisma/Travel';
import { IDeliveryRepo } from '@/servers/interface/repository/IDeliveryRepo';

export class DeliveryRepo implements IDeliveryRepo {

  constructor( public data: ITravelData<TYPE> ) {}

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