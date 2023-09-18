import { TEntity } from '@/interface/repository/AbstractRepository';
import { TPrisma } from '@/server/models/prisma/config';

export default interface InterfaceAbstractController<
  E extends TEntity,
  T extends TPrisma<E>
> {
  // readonly r: InterfaceAbstractRepository<E>;
  // readonly v: IValidationService<T>;

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