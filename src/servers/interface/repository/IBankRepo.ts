import { IBankData } from '@/servers/data-source/interface/prisma/Bank';
import { TPBank, TPBank as TYPE } from '@/servers/data-source/prisma/config';
import { IAbstractPrisma } from '@/servers/data-source/interface/prisma/IAbstract';

export interface IBankRepo {
  data: IBankData<TYPE>;
  createOne( data: TYPE ): Promise<TYPE>;
  findAll(): Promise<TYPE[]>;
  findOne( id: string ): Promise<TYPE>;
  deleteOne( id: string ): Promise<TYPE>;
  updateOne( id: string, data: TYPE ): Promise<TYPE>;
}