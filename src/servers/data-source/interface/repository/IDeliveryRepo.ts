import { ITravelData } from '@/servers/data-source/interface/prisma/Travel';
import { TPTravel as TYPE } from '@/servers/data-source/prisma/config';
import { IAbstractRepo } from '@/servers/data-source/interface/repository/IAbstractRepo';

export interface IDeliveryRepo extends IAbstractRepo<"travel"> {
  data: ITravelData<TYPE>;
  // createOne( data: TYPE ): Promise<TYPE>;
  // findAll(): Promise<TYPE[]>;
  // findOne( id: string ): Promise<TYPE>;
  // deleteOne( id: string ): Promise<TYPE>;
  // updateOne( id: string, data: TYPE ): Promise<TYPE>;
}