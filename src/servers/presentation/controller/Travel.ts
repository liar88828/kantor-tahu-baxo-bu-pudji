import { TPTravel } from '@/servers/data-source/prisma/config';
import Controller from '@/servers/presentation/controller/AController';
import { fileSystem } from '@/lib/FileSystem/fileSystem';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IDeliveryRepo } from '@/servers/interface/repository/IDeliveryRepo';

type TYPE = TPTravel;
export default class TravelController extends Controller <"travel", TYPE> {
  constructor(
    readonly r: IDeliveryRepo,
    readonly v: IValidationService<TYPE>
  ) {
    super();
  }

  async destroy( id: string ) {
    const res = await this.r.deleteOne( this.v.zodIdNew( id ) )
    await fileSystem( res.img )
    return res
  }
}
