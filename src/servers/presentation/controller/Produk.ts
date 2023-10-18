import { fileSystem } from '@/lib/FileSystem/fileSystem';
import Controller from '@/servers/presentation/controller/AController';
import { TPProduct } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IProductRepo } from '@/servers/interface/repository/IProductRepo';

export default class ProductController extends Controller <"product", TPProduct> {
  constructor(
    readonly r: IProductRepo,
    readonly v: IValidationService<TPProduct>
  ) {super()}

  async destroy( id: string ) {

    const res = await this.r.deleteOne( this.v.zodIdNew( id ) )
    await fileSystem( res.img )
    return res
  }
}
