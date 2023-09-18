import { prisma, TPOrderan } from '@/server/models/prisma/config';
import { TStatusParams } from '@/interface/repository/SemuaProduk';
import { IRepoOrderan } from '@/interface/repository/Orderan';
import { IControlOrderan } from '@/interface/controller/Orderan';
import { IService } from '@/interface/Service/IService';
import { IValidations } from '@/interface/Service/IValidations';

type  TYPE = TPOrderan
export default class OrderanController implements IControlOrderan {
  constructor(
    readonly r: IRepoOrderan<TYPE>,
    readonly v: IValidations,
    readonly s: IService
  ) {}

  async find() {
    return this.r.findAll()
  }

  findById( id: string ): Promise<any> {
    id = this.s.validId( this.v.zodId( id ), id )
    return this.r.findOne( id )
  }

  async findDashboard() {
    return this.r.findDashboard( "" )
  }

  async status( data: TStatusParams, id: string ) {
    return prisma.orderan.update( {
      where: { id: data.id },
      data : { status: data.status }
    } );
  }

  async findByStatus( status: string ) {
    console.log( status, "status" )
    const service = this.s.validId( this.v.zodId( status ), status )
    console.log( service, "service" )
    return this.r.findById( service )
  }

  async create( body: TYPE ) {
    body = this.s.validModel( this.v.zodModel( body, this.v.OrderanSchema ), body )
    if( body.namaPengiriman ) {
      const data = await this.r.createOne( body )
      console.log( data )
      return data
    }
    return body
  }

  async edit( body: TYPE, id: string ) {
    id   = this.s.validId( this.v.zodId( id ), id )
    body = this.s.validModel<TYPE>( this.v.zodModel( body, this.v.OrderanSchema ), body )
    if( body.namaPengiriman ) {
      return await this.r.updateMany( body, id )
    }
    return body
  }

  async destroy( id: string ) {
    id = this.s.validId( this.v.zodId( id ), id )
    return await this.r.destroyOne( id )
  }

  async deleteMany( body: string[] ) {

    const validData = this.s.validModel<string[]>(
      this.v.zodModel( body,
        this.v.ZIdMany ), body )

    if( typeof validData === 'object' ) {
      return this.r.destroyMany( validData )
    }

    return validData
  }
}