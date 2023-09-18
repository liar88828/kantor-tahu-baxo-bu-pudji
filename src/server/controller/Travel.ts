import { TPTravel } from '@/server/models/prisma/config';
import Controller from '@/server/controller/AController';
import { fileSystem } from '@/lib/utils/fileSystem';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoTravel } from '@/interface/repository/Travel';

type TYPE = TPTravel;
export default class TravelController2 extends Controller <"travel", TYPE> {
  constructor(
    readonly r: IRepoTravel<TYPE>,
    readonly v: IValidationService<TYPE>
  ) {
    super();
  }

  async destroy( id: string ) {
    const res = await this.Repo(
      () => this.r.destroyOne( id ),
      this.v.zodId( id ) )
    await fileSystem( res.img )
    return res
  }
}
