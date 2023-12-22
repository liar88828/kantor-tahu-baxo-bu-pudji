import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import { TPOrderan } from '@/servers/data-source/prisma/config';
import { IAbstractRepo } from '@/servers/data-source/interface/repository/IAbstractRepo';

type TYPE = TPOrderan

export interface IOrderanRepo extends IAbstractRepo<"orderan"> {
  data: IOrderanData<TYPE>;
  // createOne( data: TYPE ): Promise<TYPE>;
  // findAll(): Promise<TYPE[]>;
  // findOne( id: string ): Promise<TYPE>;
  // deleteOne( id: string ): Promise<TYPE>;
  // updateOne( id: string, data: TYPE ): Promise<TYPE>;
}