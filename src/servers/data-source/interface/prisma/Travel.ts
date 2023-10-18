import { TPTravel } from '@/servers/data-source/prisma/config';
import { IAbstractPrisma } from '@/servers/data-source/interface/prisma/IAbstract';

export interface ITravelData<T extends TPTravel> extends IAbstractPrisma<"travel"> {
  //get
  paginate( data: { row: number, skip: number } ): Promise<any>;
  //put
  updateMany( data: T[], id: string ): Promise<any>;
  //delete
  destroyMany( id: string ): Promise<any>;
}