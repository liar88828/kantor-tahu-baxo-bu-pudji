import type { IValidations } from '@/lib/validation/schema';
import type { TYPE } from '@/server/models/dataAccess/semuaProduk';
import type { IService } from '@/lib/validation/validation';
import type { IControlSemuaProduk } from '@/interface/controller/SemuaProduk';
import type { IRepoSemuaProduk } from '@/interface/repository/SemuaProduk';

export default class SemuaProdukController implements IControlSemuaProduk {
  constructor(
    readonly r: IRepoSemuaProduk<TYPE>,
    readonly v: IValidations,
    readonly s: IService
  ) {}

  async dashboard() {
    const repo = await this.r.findDashboard()
    return repo
  }

  // async status(json:TStatusParams) {
  //   const repo = await this.r.status(json)
  //   return repo
  // }

  async find() {
    const repo = await this.r.findAll()
    return repo
  }

  async findById( id: string ) {
    const service = this.s.findById( this.v.ZFindById( id ), id )
    const repo    = await this.r.findById( service )
    return repo
  }

  async create( body: TYPE, id: string ) {
    id              = this.s.findById( this.v.ZFindById( id ), id )
    const validData = this.s.create( this.v.Input( body, this.v.semuaProduk ), body )
    if( typeof validData === 'object' ) {
      return this.r.createOne( body, id )
    }
    return validData
  }
  async createText( body: TYPE, id: string ) {
    id              = this.s.findById( this.v.ZFindById( id ), id )
    const validData = this.s.create( this.v.Input( body, this.v.semuaProduk ), body )
    if( typeof validData === 'object' ) {
      return this.r.createOne( body, id )
    }
    return validData
  }

  async edit( body: TYPE, id: string ) {
    id              = this.s.findById( this.v.ZFindById( id ), id )
    const validData = this.s.create( this.v.Input( body, this.v.semuaProduk ), body )
    if( typeof validData === 'object' ) {
      return this.r.updateOne( body, id )
    }
    return validData
  }

  async destroy( id: string ) {
    id = this.s.findById( this.v.ZFindById( id ), id )
    return await this.r.destroyOne( id )
  }

}