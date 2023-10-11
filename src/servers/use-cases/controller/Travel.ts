import { TPTravel } from '@/servers/data-source/prisma/config';
import Controller from '@/servers/use-cases/controller/AController';
import { fileSystem } from '@/lib/FileSystem/fileSystem';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoTravel } from '@/servers/data-source/interface/prisma/Travel';
type TYPE = TPTravel;
export default class TravelController extends Controller <"travel", TYPE> {
  constructor(
    readonly r: IRepoTravel<TYPE>,
    readonly v: IValidationService<TYPE>
  ) {
    super();
  }

  async destroy( id: string ) {
    const res = await this.r.destroyOne( this.v.zodIdNew( id ) )
    await fileSystem( res.img )
    return res
  }
}
