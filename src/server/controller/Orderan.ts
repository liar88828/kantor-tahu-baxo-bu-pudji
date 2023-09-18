import { prisma, TPOrderan } from '@/server/models/prisma/config';
import { TStatusParams } from '@/interface/repository/SemuaProduk';
import Controller from '@/server/controller/AController';

export default class OrderanController2 extends Controller <"orderan", TPOrderan> {

  async findDashboard( a: string ) {
    return this.r.findDashboard( a )
  }

  async status( data: TStatusParams, id: string ) {
    return prisma.orderan.update( {
      where: { id: data.id },
      data : { status: data.status }
    } );
  }

  async findByStatus( status: string ) {
    return this.Repo(
      () => this.r.findById( status ),
      this.v.zodId( status ) )
  }

  async deleteMany( id: string[] ) {
    return this.Repo(
      () => this.r.destroyMany( id ),
      // destroyMany( id ),
      this.v.zodIdMany( id ) )
  }

  async edit( body: TPOrderan, id: string ) {
    const Id    = this.v.zodId( id )
    const Model = this.v.zodModel( body )
    const valid = await this.Repo( () => Model, Id )
    const repo  = await this.Repo( () => this.r.updateMany( body, id ), valid )
    return repo
  }

}