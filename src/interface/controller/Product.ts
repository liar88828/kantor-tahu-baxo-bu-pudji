import InterfaceAbstractController from '@/interface/controller/AbstractController';
import { TPProduct } from '@/server/models/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoProduct } from '@/interface/repository/Product';

export interface IControlProduct extends InterfaceAbstractController<"product", TPProduct> {
  readonly r: IRepoProduct<TPProduct>
  readonly v: IValidationService<TPProduct>;
  // findDashboard( a: string ): Promise<any>;

}