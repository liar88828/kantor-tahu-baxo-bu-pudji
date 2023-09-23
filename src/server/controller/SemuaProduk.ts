import Controller from '@/server/controller/AController';
import type { TPSemuaProduct } from '@/server/models/prisma/config';
import { IRepoSemuaProduk } from '@/interface/repository/SemuaProduk';
import { IValidationService } from '@/lib/validation/zod/validationService';

type TYPE = TPSemuaProduct;

export default class SemuaProductController2 extends Controller <"semuaProduct", TYPE> {

  constructor(
    readonly r: IRepoSemuaProduk<TPSemuaProduct>,
    readonly v: IValidationService<TPSemuaProduct>
  ) {
    super();
  }

  async dashboard() {
    return await this.r.findDashboard()
  }
}
