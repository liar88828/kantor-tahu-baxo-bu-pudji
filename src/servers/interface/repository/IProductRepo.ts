import { IProductData } from '@/servers/data-source/interface/prisma/Product';
import { TPProduct as TYPE } from '@/servers/data-source/prisma/config';

export interface IProductRepo {
  data: IProductData<TYPE>;
  createOne( data: TYPE ): Promise<TYPE>;
  findAll(): Promise<TYPE[]>;
  findOne( id: string ): Promise<TYPE>;
  deleteOne( id: string ): Promise<TYPE>;
  updateOne( id: string, data: TYPE ): Promise<TYPE>;
}