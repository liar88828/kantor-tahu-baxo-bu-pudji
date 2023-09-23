import InterfaceAbstractController from '@/interface/controller/AbstractController';
import { TPSemuaProduct } from '@/server/models/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoSemuaProduk } from '@/interface/repository/SemuaProduk';

export interface IControlSemuaProduk extends InterfaceAbstractController<"semuaProduct", TPSemuaProduct> {
  readonly r: IRepoSemuaProduk<TPSemuaProduct>
  readonly v: IValidationService<TPSemuaProduct>;
  // readonly v: IValidationService<TPProduct>;
  create( json: any, id: string ): Promise<any>;
  //find
  dashboard(): Promise<any>;
  // findDashboard( a: string ): Promise<any>;
  // status( json:{id:string,status:string}): Promise<any>;

}
