import type { TPSemuaProduct } from '@/server/models/prisma/config';
import Controller from '@/server/controller/AController';

type TYPE = TPSemuaProduct;

export default class SemuaProductController2 extends Controller <"semuaProduct", TYPE> {
  async dashboard() {
    return await this.r.findDashboard( "" )
  }
}
