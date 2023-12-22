import { TEntity, TPrisma } from '@/servers/data-source/prisma/config';

export interface IAbstractController<
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