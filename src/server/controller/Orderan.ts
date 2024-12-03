import { TPOrderan } from '@/server/models/prisma/config';
import { TStatusParams } from '@/interface/repository/SemuaProduk';
import Controller from '@/server/controller/AController';
import { IControlOrderan } from '@/interface/controller/Orderan';
import { IRepoOrderan } from '@/interface/repository/Orderan';
import { IValidationService } from '@/lib/validation/zod/validationService';

export default class OrderanController extends Controller <"orderan", TPOrderan> implements IControlOrderan {
  constructor(
    readonly r: IRepoOrderan<TPOrderan>,
    readonly v: IValidationService<TPOrderan>
  ) {
    super();
  }

  async findDashboard( a: string ) {
    return this.r.findDashboard( a )
  }

  async updateStatus( data: TStatusParams, id: string ) {
    return this.r.updateStatus( data, this.v.zodIdNew( id ) )
    // return this.Repo(
    //   () => this.r.updateStatus( data, id ),
    //   this.v.zodId( id ) )
  }

  async findById( id: string ) {
    return this.r.findById( this.v.zodIdNew( id ) )

    // return this.Repo(
    //   () => this.r.findById( id ),
    //   this.v.zodId( id ) )
  }

  async findByStatus( status: string ) {
    return this.r.findByStatus( this.v.zodIdNew( status ) )

    // return this.Repo(
    //   () => this.r.findByStatus( status ),
    //   this.v.zodId( status ) )
  }

  async deleteMany( id: string[] ) {
    return this.r.destroyMany( this.v.zodIdManyNew( id ) )

    // console.log( id )
    // const respon = await this.Repo(
    //   () => this.r.destroyMany( id ),
    //   this.v.zodIdMany( id ) )
    // console.log( respon )
    // return respon
  }

  async destroyOne( id: string ) {
    return this.r.destroyOne( this.v.zodIdNew( id ) )

    // return this.Repo(
    //   () => this.r.destroyOne( id ),
    //   this.v.zodId( id ) )
  }

  async edit( data: TPOrderan, id: string ) {
    return this.r.updateMany(
      this.v.zodModelNew( data ),
      this.v.zodIdNew( id ) )

    // const Id    = this.v.zodId( id )
    // const Model = this.v.zodModel( body )
    // const valid = await this.Repo( () => Model, Id )
    // const repo  = await this.Repo( () => this.r.updateMany( body, id ), valid )
    // return repo
  }

}