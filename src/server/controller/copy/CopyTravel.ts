import { TPTravel } from '@/server/models/prisma/config';

import { IControlTravel } from '@/interface/controller/Travel';
import { IRepoTravel } from '@/interface/repository/Travel';
import { fileSystem } from '@/lib/utils/fileSystem';
import { IService } from '@/interface/Service/IService';
import { IValidations } from '@/interface/Service/IValidations';

type TYPE = TPTravel;

export default class TravelController implements IControlTravel {
  constructor(
    readonly r: IRepoTravel<TYPE>,
    readonly v: IValidations,
    readonly s: IService
  ) {}
  async find(): Promise<any> {
    return await this.r.findAll()
  }

  async findById( id: string ) {
    id = this.s.validId( this.v.zodId( id ), id )
    return await this.r.findById( id )
  }

  async create( body: TYPE ) {

    body = this.s.validModel( this.v.zodModel( body, this.v.TravelSchema ), body )
    if( body.nama ) {
      return this.r.createOne( body )
    }
    return body
  }

  async edit( body: TYPE, id: string ) {
    id   = this.s.validId( this.v.zodId( id ), id )
    body = this.s.validModel( this.v.zodModel( body, this.v.TravelSchema ), body )
    if( body.nama ) {
      return this.r.updateOne( body, id )
    }
    return body
  }

  async destroy( id: string ) {
    id         = this.s.validId( this.v.zodId( id ), id )
    const data = await this.r.destroyOne( id )
    await fileSystem( data.img )
    return data
  }
}

