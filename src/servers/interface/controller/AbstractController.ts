import { TPrisma } from '@/servers/data-source/prisma/config';
import { TEntity } from '@/servers/data-source/interface/prisma/IAbstract';

export default interface IAbstractController<
  E extends TEntity,
  T extends TPrisma<E>
> {
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