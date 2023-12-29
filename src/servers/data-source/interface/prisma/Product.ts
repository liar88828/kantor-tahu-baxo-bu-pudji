import { IAbstractPrisma } from '@/servers/data-source/interface/prisma/IAbstract';
import { TPProduct } from '@/interface/prisma';

export interface IProductData<T extends TPProduct> extends IAbstractPrisma<"product"> {
  setMany( data: T[] ): any[];
  //put
  updateMany( data: T[], id: string ): Promise<any>;
}