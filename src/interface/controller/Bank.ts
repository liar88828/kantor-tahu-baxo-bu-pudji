import InterfaceAbstractController from '@/interface/controller/AbstractController';
import { TPBank } from '@/server/models/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoBank } from '@/interface/repository/Bank';

export interface IControlBank extends InterfaceAbstractController<"bank", TPBank> {
  readonly r: IRepoBank<TPBank>
  readonly v: IValidationService<TPBank>;

}
