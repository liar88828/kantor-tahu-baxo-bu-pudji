import { IAbstractRepo } from '@/servers/data-source/interface/repository/IAbstractRepo';
import { IBankData } from '@/servers/data-source/interface/prisma/Bank';
import { TPBank } from '@/interface/prisma';

export interface IBankRepo extends IAbstractRepo<"bank"> {
  data: IBankData<TPBank>;
  // createOne( data: TYPE ): Promise<TYPE>;
  // findAll(): Promise<TYPE[]>;
  // findOne( id: string ): Promise<TYPE>;
  // deleteOne( id: string ): Promise<TYPE>;
  // updateOne( id: string, data: TYPE ): Promise<TYPE>;
}