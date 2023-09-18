import { IAController } from '@/interface/controller/old/IAController';
import IANewController from '@/interface/controller/IANewController';
import { TPSemuaProduct } from '@/server/models/prisma/config';

export interface IControlSemuaProduk extends IAController<"semuaProduct"> {
  create( json: any, id: string ): Promise<any>;
  //find
  dashboard(): Promise<any>;
  // status( json:{id:string,status:string}): Promise<any>;

}

export interface IControlSemuaProduk2 extends IANewController<"semuaProduct", TPSemuaProduct> {
  create( json: any, id: string ): Promise<any>;
  //find
  dashboard(): Promise<any>;
  // status( json:{id:string,status:string}): Promise<any>;

}
