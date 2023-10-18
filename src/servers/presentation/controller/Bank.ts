import { TPBank } from '@/servers/data-source/prisma/config';
import Controller from '@/servers/presentation/controller/AController';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IBankData } from '@/servers/data-source/interface/prisma/Bank';
import { IBankRepo } from '@/servers/interface/repository/IBankRepo';

type TYPE = TPBank;

export default class BankController extends Controller <"bank", TYPE> {
  constructor(
    readonly r: IBankRepo,
    readonly v: IValidationService<TPBank>
  ) {
    super();
  }

}
