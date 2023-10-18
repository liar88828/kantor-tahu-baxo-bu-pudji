import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import { TPOrderan as TYPE } from '@/servers/data-source/prisma/config';

export interface IOrderanRepo {
  data: IOrderanData<TYPE>;
  createOne( data: TYPE ): Promise<TYPE>;
  findAll(): Promise<TYPE[]>;
  findOne( id: string ): Promise<TYPE>;
  deleteOne( id: string ): Promise<TYPE>;
  updateOne( id: string, data: TYPE ): Promise<TYPE>;
}