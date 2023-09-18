import { fileSystem } from '@/lib/utils/fileSystem';

import { TPProduct } from '@/server/models/prisma/config';
import { IControlProduct } from '@/interface/controller/Product';
import { IService } from '@/interface/Service/IService';
import { IValidations } from '@/interface/Service/IValidations';
import { IRepoProduct } from '@/interface/repository/Product';

type TYPE = TPProduct;

export default class ProductController implements IControlProduct {
  constructor(
    readonly r: IRepoProduct<TYPE>,
    readonly v: IValidations,
    readonly s: IService
  ) {}

  async find() {
    return this.r.findAll()
  }

  async findById( id: string ) {
    id = this.s.validId( this.v.zodId( id ), id )
    return await this.r.findById( id )
  }

  async create( body: TYPE ) {
    body = this.s.validModel<TYPE>( this.v.zodModel( body, this.v.ProductSchema ), body )
    if( body.nama ) {
      return this.r.createOne( body )
    }
    return body
  }

  async edit( body: TYPE, id: string ) {
    id   = this.s.validId( this.v.zodId( id ), id )
    body = this.s.validModel( this.v.zodModel( body, this.v.ProductSchema ), body )
    if( body.nama ) {
      return this.r.updateOne( body, id, )
    }
    return body
  }

  async destroy( id: string, ) {
    id         = this.s.validId( this.v.zodId( id ), id )
    const data = await this.r.destroyOne( id )
    await fileSystem( data.img )
    return data
  }
}