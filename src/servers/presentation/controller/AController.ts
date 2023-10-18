import { TPrisma } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import IAbstractController from '@/servers/interface/controller/AbstractController';
import { IRepositoryAll, TEntity } from '@/servers/data-source/interface/prisma/IAbstract';

export default abstract class Controller<
  E extends TEntity,
  T extends TPrisma<E>
> implements IAbstractController<E, T> {//murni

  abstract r: IRepositoryAll<E>

  abstract v: IValidationService<T>

  async find() {
    return await this.r.findAll();
  }

  async findById( id: string ) {
    console.info( "A control" )
    return this.r.findOne( this.v.zodIdNew( id ) )
  }

  async create( json: T ) {
    console.info( "A control" )
    const data = await this.r.createOne(
      // @ts-ignore
      this.v.zodModelNew( json )
    )
    console.log( data )
    return data
  }

  async edit( json: T, id: string ) {
    console.info( "A control" )
    return this.r.updateOne(
      this.v.zodIdNew( id ),
      // @ts-ignore
      this.v.zodModelNew( json )
    )
  }

  async destroy( id: string ) {
    console.info( "A control" )
    return this.r.deleteOne(
      this.v.zodIdNew( id )
    )

  }
}

