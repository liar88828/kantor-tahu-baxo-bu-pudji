import { TStatusParams } from '@/interface/repository/SemuaProduk';
import InterfaceAbstractController from '@/interface/controller/AbstractController';
import { TPOrderan } from '@/server/models/prisma/config';
import { IRepoOrderan } from '@/interface/repository/Orderan';
import { IValidationService } from '@/lib/validation/zod/validationService';

export interface IControlOrderan2 extends InterfaceAbstractController<"orderan", TPOrderan> {
  readonly r: IRepoOrderan<TPOrderan>
  readonly v: IValidationService<TPOrderan>;

  //get
  findDashboard( a: string ): Promise<any>;

  findByStatus( id: string ): Promise<any>;
  status( data: TStatusParams, id: string ): Promise<any>;
  //delete
  deleteMany( id: string[] ): Promise<any>;
}
