import { TPOrderan } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import { TStatusParams } from '@/servers/data-source/interface/prisma/SemuaProduk';
import { IAbstractController } from '@/servers/domain/interface/controllers/AbstractController';

type TYPE = TPOrderan;

export interface IControlOrderan extends IAbstractController<"orderan", TYPE> {
  readonly r: IOrderanData<TYPE>
  readonly v: IValidationService<TYPE>;

  //get
  findDashboard( a: string ): Promise<any>;

  findByStatus( id: string ): Promise<any>;
  updateStatus( data: TStatusParams, id: string ): Promise<any>;
  //delete
  deleteMany( id: string[] ): Promise<any>;
  destroyOne( id: string ): Promise<any>;
}
