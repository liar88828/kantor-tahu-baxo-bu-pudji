import { TPBank } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IBankRepo } from '@/servers/data-source/interface/repository/IBankRepo';
import Controller from '@/servers/domain/controllers/AController';

type TYPE = TPBank;

export default class BankController extends Controller <"bank", TYPE> {
  constructor(
    readonly r: IBankRepo,
    readonly v: IValidationService<TPBank>
  ) {
    super();
  }

}
