import { InterController } from '@/interface/controller/Abstract';
import { InterfaceAbstractRepository } from '@/interface/repository/Abstract';

export interface IControlSemuaProduk extends InterController {
  readonly r: InterfaceAbstractRepository<"semuaProduct">;
  create( json: any, id: string ): Promise<any>;
  createText( json: any, id: string ): Promise<any>;
  //find
  dashboard(): Promise<any>;
  // status( json:{id:string,status:string}): Promise<any>;

}