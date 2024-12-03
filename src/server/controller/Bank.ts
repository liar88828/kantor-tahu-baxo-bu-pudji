import { TPBank } from '@/server/models/prisma/config';
import Controller from '@/server/controller/AController';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoBank } from '@/interface/repository/Bank';

type TYPE = TPBank;

export default class BankController extends Controller <"bank", TYPE> {
  constructor(
    readonly r: IRepoBank<TPBank>,
    readonly v: IValidationService<TPBank>
  ) {
    super();
  }

}
