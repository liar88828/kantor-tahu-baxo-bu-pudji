import { TPOrderan } from '@/servers/data-source/prisma/config';
import Controller from '@/servers/use-cases/controller/AController';
import { IControlOrderan } from '@/servers/interface/controller/Orderan';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { TStatusParams } from '@/servers/data-source/interface/prisma/SemuaProduk';
import { IRepoOrderan } from '@/servers/data-source/interface/prisma/Orderan';

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
  }

  async findById( id: string ) {
    return this.r.findById( this.v.zodIdNew( id ) )
  }

  async findByStatus( status: string ) {
    return this.r.findByStatus( this.v.zodIdNew( status ) )
  }

  async deleteMany( id: string[] ) {
    return this.r.destroyMany( this.v.zodIdManyNew( id ) )
  }

  async destroyOne( id: string ) {
    return this.r.destroyOne( this.v.zodIdNew( id ) )
  }

  async edit( data: TPOrderan, id: string ) {
    return this.r.updateMany(
      this.v.zodModelNew( data ),
      this.v.zodIdNew( id ) )
  }

}