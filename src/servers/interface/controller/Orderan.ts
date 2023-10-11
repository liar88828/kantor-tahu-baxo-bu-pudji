import IAbstractController from '@/servers/interface/controller/AbstractController';
import { TPOrderan } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoOrderan } from '@/servers/data-source/interface/prisma/Orderan';
import { TStatusParams } from '@/servers/data-source/interface/prisma/SemuaProduk';

export interface IControlOrderan extends IAbstractController<"orderan", TPOrderan> {
  readonly r: IRepoOrderan<TPOrderan>
  readonly v: IValidationService<TPOrderan>;

  //get
  findDashboard( a: string ): Promise<any>;

  findByStatus( id: string ): Promise<any>;
  updateStatus( data: TStatusParams, id: string ): Promise<any>;
  //delete
  deleteMany( id: string[] ): Promise<any>;
  destroyOne( id: string ): Promise<any>;
}
