import { fileSystem } from '@/lib/FileSystem/fileSystem';
import Controller from '@/servers/use-cases/controller/AController';
import { TPProduct } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoProduct } from '@/servers/data-source/interface/prisma/Product';

export default class ProductController extends Controller <"product", TPProduct> {
  constructor(
    readonly r: IRepoProduct<TPProduct>,
    readonly v: IValidationService<TPProduct>
  ) {super()}

  async destroy( id: string ) {

    const res = await this.r.destroyOne( this.v.zodIdNew( id ) )
    await fileSystem( res.img )
    return res
  }
}
