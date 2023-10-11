import IAbstractController from '@/servers/interface/controller/AbstractController';
import { TPProduct } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoProduct } from '@/servers/data-source/interface/prisma/Product';

export interface IControlProduct extends IAbstractController<"product", TPProduct> {
  readonly r: IRepoProduct<TPProduct>
  readonly v: IValidationService<TPProduct>;
  // findDashboard( a: string ): Promise<any>;

}