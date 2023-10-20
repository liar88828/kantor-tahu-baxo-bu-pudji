import { IAbstractRepo } from '@/servers/interface/repository/IAbstractRepo';
import { IDataAll, IModelAll, TEntity } from '@/servers/data-source/interface/prisma/IAbstract';

export default abstract class AbstractRepo<T extends TEntity> implements IAbstractRepo<T> {
  abstract data: IDataAll<T>;

  createOne( data: IModelAll<T> ): Promise<IModelAll<T>> {
    // @ts-ignore
    return this.data.createOne( data )
    // return Promise.resolve( undefined );
  }
  deleteOne( id: string ): Promise<IModelAll<T>> {
    return this.data.destroyOne( id )
    // return Promise.resolve( undefined );
  }
  findAll(): Promise<IModelAll<T>[]> {
    return this.data.findAll()
    // return Promise.resolve( [] );
  }
  findOne( id: string ): Promise<IModelAll<T>> {
    return this.data.findById( id )
    // return Promise.resolve( undefined );
  }
  updateOne( id: string, data: IModelAll<T> ): Promise<IModelAll<T>> {
    // @ts-ignore
    return this.data.updateOne( data, id )
    // return Promise.resolve( undefined );
  }

}