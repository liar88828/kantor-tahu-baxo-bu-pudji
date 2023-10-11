import { TPBank } from '@/servers/data-source/prisma/config';
import Controller from '@/servers/use-cases/controller/AController';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoBank } from '@/servers/data-source/interface/prisma/Bank';

type TYPE = TPBank;

export default class BankController extends Controller <"bank", TYPE> {
  constructor(
    readonly r: IRepoBank<TPBank>,
    readonly v: IValidationService<TPBank>
  ) {
    super();
  }

}
