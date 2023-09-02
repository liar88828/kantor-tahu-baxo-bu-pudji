import type { TYPE } from '@/server/models/dataAccess/Bank';
import { IValidations } from '@/lib/validation/schema';
import { IService } from '@/lib/validation/validation';
import { InterRepository } from '@/server/repository/interface/repository/Repository';
import { InterController } from '@/entity/server/controller/bank';

export default class BankController implements InterController {
  constructor(
    readonly r: InterRepository,
    readonly v: IValidations,
    readonly s: IService
  ) {}

  async find() {
    const repo = await this.r.findAll();
    return repo;
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