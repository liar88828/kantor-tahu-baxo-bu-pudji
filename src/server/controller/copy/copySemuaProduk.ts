import type { IControlSemuaProduk } from '@/interface/controller/SemuaProduk';
import type { IRepoSemuaProduk } from '@/interface/repository/SemuaProduk';
import type { TPSemuaProduct } from '@/server/models/prisma/config';
import { IService } from '@/interface/Service/IService';
import { IValidations } from '@/interface/Service/IValidations';

type TYPE = TPSemuaProduct;
export default class SemuaProdukController implements IControlSemuaProduk {
  constructor(
    readonly r: IRepoSemuaProduk<TYPE>,
    readonly v: IValidations,
    readonly s: IService
  ) {}

  async dashboard() {
    return await this.r.findDashboard()
  }

  async find() {
    return await this.r.findAll()
  }

  async findById( id: string ) {
    id = this.s.validId( this.v.zodId( id ), id )
    return await this.r.findById( id )
  }

  async create( body: TYPE, id: string ) {
    id   = this.s.validId( this.v.zodId( id ), id )
    body = this.s.validModel( this.v.zodModel( body, this.v.semuaProdukSchema ), body )
    if( body.nama ) {
      return this.r.createOne( body, id )
    }
    return body
  }

  async edit( body: TYPE, id: string ) {
    id   = this.s.validId( this.v.zodId( id ), id )
    body = this.s.validModel( this.v.zodModel( body, this.v.semuaProdukSchema ), body )

    if( body.nama ) {
      return this.r.updateOne( body, id )
    }
    return body
  }

  async destroy( id: string ) {
    id = this.s.validId( this.v.zodId( id ), id )
    return await this.r.destroyOne( id )
  }

}