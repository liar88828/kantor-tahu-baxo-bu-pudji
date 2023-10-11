import IAbstractController from '@/servers/interface/controller/AbstractController';
import { TPSemuaProduct } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoSemuaProduk } from '@/servers/data-source/interface/prisma/SemuaProduk';

export interface IControlSemuaProduk extends IAbstractController<"semuaProduct", TPSemuaProduct> {
  readonly r: IRepoSemuaProduk<TPSemuaProduct>
  readonly v: IValidationService<TPSemuaProduct>;
  // readonly v: IValidationService<TPProduct>;
  create( json: any, id: string ): Promise<any>;
  //find
  dashboard(): Promise<any>;
  // findDashboard( a: string ): Promise<any>;
  // status( json:{id:string,status:string}): Promise<any>;

}
