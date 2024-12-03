import { fileSystem } from '@/lib/utils/fileSystem';
import Controller from '@/server/controller/AController';
import { TPProduct } from '@/server/models/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoProduct } from '@/interface/repository/Product';

export default class ProductController extends Controller <"product", TPProduct> {
  constructor(
    readonly r: IRepoProduct<TPProduct>,
    readonly v: IValidationService<TPProduct>
  ) {super()}

  async destroy( id: string ) {
    // const res = await this.Repo(
    //   () => this.r.destroyOne( id ),
    //   this.v.zodId( id ) )

    const res = await this.r.destroyOne( this.v.zodIdNew( id ) )
    await fileSystem( res.img )
    return res
  }
}
