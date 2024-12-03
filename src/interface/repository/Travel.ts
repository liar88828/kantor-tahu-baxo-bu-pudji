import { TPTravel } from '@/server/models/prisma/config';
import { InterfaceAbstractRepository } from '@/interface/repository/AbstractRepository';

export interface IRepoTravel<T extends TPTravel> extends InterfaceAbstractRepository<"travel"> {
  //get
  paginate( data: { row: number, skip: number } ): Promise<any>;
  //put
  updateMany( data: T[], id: string ): Promise<any>;
  //delete
  destroyMany( id: string ): Promise<any>;
}