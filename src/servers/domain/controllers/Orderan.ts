import { TPOrderan } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { TStatusParams } from '@/servers/data-source/interface/prisma/SemuaProduk';
import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import Controller from '@/servers/domain/controllers/AController';
import { IControlOrderan } from '@/servers/domain/interface/controllers/Orderan';

type TYPE = TPOrderan;

export default class OrderanController extends Controller <"orderan", TYPE> implements IControlOrderan {
  constructor(
    readonly r: IOrderanData<TYPE>,
    readonly v: IValidationService<TYPE>
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

  async edit( data: TYPE, id: string ) {
    return this.r.updateMany(
      this.v.zodModelNew( data ),
      this.v.zodIdNew( id ) )
  }

}