import { TPTravel } from '@/servers/data-source/prisma/config';
import { ITravelData } from '@/servers/data-source/interface/prisma/Travel';
import { IDeliveryRepo } from '@/servers/data-source/interface/repository/IDeliveryRepo';
import AbstractRepo from '@/servers/data-source/repository/AbstractRepo';

type TYPE = TPTravel

export class DeliveryRepo extends AbstractRepo<"travel"> implements IDeliveryRepo {

  constructor( public data: ITravelData<TYPE> ) {super()}
  //
  // async createOne( data: TYPE ): Promise<TYPE> {
  //   return this.data.createOne( data )
  // }
  //
  // async findAll(): Promise<TYPE[]> {
  //   return this.data.findAll()
  // }
  //
  // async findOne( id: string ): Promise<TYPE> {
  //   return this.data.findById( id )
  // }
  //
  // async deleteOne( id: string ): Promise<TYPE> {
  //   return this.data.destroyOne( id )
  // }
  //
  // async updateOne( id: string, data: TYPE ): Promise<TYPE> {
  //   return this.data.updateOne( data, id )
  // }

}