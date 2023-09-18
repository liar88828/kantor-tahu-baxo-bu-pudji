import { IControlBank } from '@/interface/controller/Bank';
import { IBankRepository } from '@/interface/repository/Bank';
import { TPBank } from '@/server/models/prisma/config';
import { IValidations } from '@/interface/Service/IValidations';
import { SafeParseReturnType } from 'zod';

type TYPE = TPBank;

export default class BankController implements IControlBank {

  public Bank: IValidations["BankSchema"]

  constructor(
    readonly r: IBankRepository<TYPE>,
    readonly v: IValidations,
    // readonly s: IService
  ) {
    this.Bank = v.BankSchema
  }
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
      return await repo()
    }
    else {
      const err = zod.error.message
      console.error( err )
      return JSON.parse( err )
    }
  }

  async find() {
    return await this.r.findAll();
  }

  async findById( id: string ) {
    return this.Repo(
      () => this.r.findById( id ),
      this.v.zodId( id ) )
  }

  async create( json: TYPE ) {

    return this.Repo(
      () => this.r.createOne( json ),
      this.v.zodModel<TYPE>( json, this.v.BankSchema ) )
  }

  async edit( json: TYPE, id: string ) {
    const valId    = this.v.zodId( id )
    const valModel = this.v.zodModel( json, this.v.BankSchema )
    const valid    = await this.Repo( () => valModel, valId )
    return this.Repo( () => this.r.updateOne( json, id ), valid )
  }

  async destroy( id: string ) {
    return this.Repo(
      () => this.r.destroyOne( id ),
      this.v.zodId( id ) )

  }
}