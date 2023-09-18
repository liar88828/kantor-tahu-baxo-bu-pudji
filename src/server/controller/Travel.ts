import { TPTravel } from '@/server/models/prisma/config';
import Controller from '@/server/controller/AController';
import { fileSystem } from '@/lib/utils/fileSystem';

type TYPE = TPTravel;
export default class TravelController2 extends Controller <"travel", TYPE> {

  async destroy( id: string ) {
    const res = await this.Repo(
      () => this.r.destroyOne( id ),
      this.v.zodId( id ) )
    await fileSystem( res.img )
    return res
  }
}
