import { TPBank } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IBankRepo } from '@/servers/data-source/interface/repository/IBankRepo';
import { IAbstractController } from '@/servers/domain/interface/controllers/AbstractController';

export interface IControlBank extends IAbstractController<"bank", TPBank> {
  readonly r: IBankRepo
  readonly v: IValidationService<TPBank>;

}
