import { TPProduct as TYPE } from '@/servers/data-source/prisma/config';
import { IProductData } from '@/servers/data-source/interface/prisma/Product';
import { IProductRepo } from '@/servers/interface/repository/IProductRepo';

export class ProductRepo implements IProductRepo {

  constructor( public data: IProductData<TYPE> ) {}

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