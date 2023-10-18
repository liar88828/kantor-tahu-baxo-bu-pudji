import { TPProduct, } from '@/servers/data-source/prisma/config';
import { IAbstractPrisma } from '@/servers/data-source/interface/prisma/IAbstract';

export interface IProductData<T extends TPProduct> extends IAbstractPrisma<"product"> {
  setMany( data: T[] ): any[];
  //put
  updateMany( data: T[], id: string ): Promise<any>;
}