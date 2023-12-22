import { TPProduct as TYPE } from '@/servers/data-source/prisma/config';
import { IProductData } from '@/servers/data-source/interface/prisma/Product';
import { IProductRepo } from '@/servers/data-source/interface/repository/IProductRepo';
import AbstractRepo from '@/servers/data-source/repository/AbstractRepo';

export class ProductRepo extends AbstractRepo<"product"> implements IProductRepo {

  constructor( public data: IProductData<TYPE> ) {super()}

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