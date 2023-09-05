import type { TYPE } from '@/server/models/dataAccess/Bank';
import type { IValidations } from '@/lib/validation/schema';
import type { IService } from '@/lib/validation/validation';
import { IControlBank } from '@/interface/controller/Bank';
import { IBankRepository } from '@/interface/repository/Bank';

export default class BankController implements IControlBank {
  constructor(
    readonly r: IBankRepository<TYPE>,
    readonly v: IValidations,
    readonly s: IService
  ) {}

  async find() {
    return await this.r.findAll();
  }

  async findById( id: string ) {
    id = this.s.findById( this.v.ZFindById( id ), id );
    if( id.includes( id ) ) {
      return this.r.findById( id );
    }
    return id;
  }

  async create( json: TYPE ) {
    json = this.s.create<TYPE>( this.v.Input( json, this.v.ServiceBank ), json );
    if( json.nama ) {
      return this.r.createOne( json );
    }

    return json
  }

  async edit( json: TYPE, id: string ) {
    id   = this.s.findById( this.v.ZFindById( id ), id );
    json = this.s.create( this.v.Input( json, this.v.ServiceBank ), json );

    if( id.includes( id ) && json.nama ) {
      return this.r.updateOne( json, id );
    }

    return json;
  }

  async destroy( id: string ) {
    id = this.s.findById( this.v.ZFindById( id ), id );
    if( id.includes( id ) ) {
      return this.r.destroyOne( id );
    }
    return id
  }
}