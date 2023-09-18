import { fileSystem } from '@/lib/utils/fileSystem';
import { TPProduct } from '@/server/models/prisma/config';
import Controller from '@/server/controller/AController';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoProduct } from '@/interface/repository/Product';

export default class ProductController2 extends Controller <"product", TPProduct> {
  constructor(
    readonly r: IRepoProduct<TPProduct>,
    readonly v: IValidationService<TPProduct>
  ) {super()}

  async destroy( id: string ) {
    const res = await this.Repo(
      () => this.r.destroyOne( id ),
      this.v.zodId( id ) )
    await fileSystem( res.img )
    return res
  }
}
