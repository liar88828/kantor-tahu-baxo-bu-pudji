import { TPProduct } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IProductRepo } from '@/servers/data-source/interface/repository/IProductRepo';
import { IAbstractController } from '@/servers/domain/interface/controllers/AbstractController';

export interface IControlProduct extends IAbstractController<"product", TPProduct> {
  readonly r: IProductRepo
  readonly v: IValidationService<TPProduct>;
  // findDashboard( a: string ): Promise<any>;

}