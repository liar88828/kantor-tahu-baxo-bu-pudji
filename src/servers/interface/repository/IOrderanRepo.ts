import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import { TPOrderan as TYPE } from '@/servers/data-source/prisma/config';
import { IAbstractRepo } from '@/servers/interface/repository/IAbstractRepo';

export interface IOrderanRepo extends IAbstractRepo<"orderan"> {
  data: IOrderanData<TYPE>;
  // createOne( data: TYPE ): Promise<TYPE>;
  // findAll(): Promise<TYPE[]>;
  // findOne( id: string ): Promise<TYPE>;
  // deleteOne( id: string ): Promise<TYPE>;
  // updateOne( id: string, data: TYPE ): Promise<TYPE>;
}