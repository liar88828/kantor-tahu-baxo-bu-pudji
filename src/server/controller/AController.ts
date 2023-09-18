import { SafeParseReturnType } from 'zod';
import { InterfaceAbstractRepository, TEntity } from '@/interface/repository/Abstract';
import { TPrisma } from '@/server/models/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import IANewController from '@/interface/controller/IANewController';

export default class Controller<
  E extends TEntity,
  T extends TPrisma<E>
> implements IANewController<E, T> {//murni
  constructor(
    readonly r: InterfaceAbstractRepository<E>,
    readonly v: IValidationService<T>,
  ) {}

  public async Repo<T>(
    repo: () => Promise<any> | any,
    zod: SafeParseReturnType<T, T>
  ) {

    console.log( "--- repo ---" )
    if( typeof repo !== "function" ) {
      const err = "is not function"
      console.error( err )
      return err
    }
    if( zod.success ) {
      console.info( "success function" )
      console.log( repo.toString() )
      return repo()
    }

    if( typeof zod.success === "boolean" ) {
      const err = zod.error.message
      return JSON.parse( err )
    }
    console.error( "error" )
    return zod
  }

  async find() {
    return await this.r.findAll();
  }

  async findById( id: string ) {
    console.log( id )
    return this.Repo(
      () => this.r.findById( id ),
      this.v.zodId( id ) )
  }

  async create( json: T ) {
    // console.info("A control")
    // console.log( json )
    return this.Repo(
      () => this.r.createOne( json ),
      this.v.zodModel( json ) )
  }

  async edit( json: T, id: string ) {
    console.info( "A control" )

    const Id    = this.v.zodId( id )
    const Model = this.v.zodModel( json )
    const valid = await this.Repo( () => Model, Id )
    const repo  = await this.Repo( () => this.r.updateOne( json, id ), valid )
    return repo
  }

  async destroy( id: string ) {
    console.log( id )
    return this.Repo(
      () => this.r.destroyOne( id ),
      this.v.zodId( id ) )

  }
}

