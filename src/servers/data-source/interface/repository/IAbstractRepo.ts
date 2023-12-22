import { IModelAll, TEntity } from '@/servers/data-source/prisma/config';

export interface IAbstractRepo<T extends TEntity> {
  // readonly data: IModelAll<T>;
  createOne( data: IModelAll<T> ): Promise<IModelAll<T>>;
  findAll(): Promise<IModelAll<T>[]>;
  findOne( id: string ): Promise<IModelAll<T>>;
  deleteOne( id: string ): Promise<IModelAll<T>>;
  updateOne( id: string, data: IModelAll<T> ): Promise<IModelAll<T>>;
}