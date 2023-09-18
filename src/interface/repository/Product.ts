import { TPProduct, } from '@/server/models/prisma/config';
import { InterfaceAbstractRepository } from '@/interface/repository/Abstract';

export interface IRepoProduct<T extends TPProduct> extends InterfaceAbstractRepository<"product"> {
  setMany( data: T[] ): any[];
  //put
  updateMany( data: T[], id: string ): Promise<any>;

}