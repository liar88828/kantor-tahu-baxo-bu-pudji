import { InterfaceAbstractRepository, TEntity } from '@/interface/repository/Abstract';
import { TPrisma } from '@/server/models/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';

export default interface IANewController<
  E extends TEntity,
  T extends TPrisma<E>
> {
  readonly r: InterfaceAbstractRepository<E>;
  readonly v: IValidationService<T>;

  // readonly s: IService;
  //get
  find(): Promise<any>;
  findById( id: string ): Promise<any>;
  //create
  create( json: T, id?: string ): Promise<any>;
  //put
  edit( json: T, id: string ): Promise<any>;
  //delete
  destroy( id: string ): Promise<any>;
}