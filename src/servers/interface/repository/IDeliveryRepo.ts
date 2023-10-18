import { ITravelData } from '@/servers/data-source/interface/prisma/Travel';
import { TPTravel as TYPE } from '@/servers/data-source/prisma/config';

export interface IDeliveryRepo {
  data: ITravelData<TYPE>;
  createOne( data: TYPE ): Promise<TYPE>;
  findAll(): Promise<TYPE[]>;
  findOne( id: string ): Promise<TYPE>;
  deleteOne( id: string ): Promise<TYPE>;
  updateOne( id: string, data: TYPE ): Promise<TYPE>;
}