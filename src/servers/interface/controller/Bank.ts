import IAbstractController from '@/servers/interface/controller/AbstractController';
import { TPBank } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoBank } from '@/servers/data-source/interface/prisma/Bank';

export interface IControlBank extends IAbstractController<"bank", TPBank> {
  readonly r: IRepoBank<TPBank>
  readonly v: IValidationService<TPBank>;

}
