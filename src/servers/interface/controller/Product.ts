import IAbstractController from '@/servers/interface/controller/AbstractController';
import { TPProduct } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IProductData } from '@/servers/data-source/interface/prisma/Product';
import { IProductRepo } from '@/servers/interface/repository/IProductRepo';

export interface IControlProduct extends IAbstractController<"product", TPProduct> {
  readonly r: IProductRepo
  readonly v: IValidationService<TPProduct>;
  // findDashboard( a: string ): Promise<any>;

}