import Controller from '@/servers/use-cases/controller/AController';
import type { TPSemuaProduct } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoSemuaProduk } from '@/servers/data-source/interface/prisma/SemuaProduk';

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
