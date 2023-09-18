import { IAController } from '@/interface/controller/old/IAController';
import { TStatusParams } from '@/interface/repository/SemuaProduk';
import IANewController from '@/interface/controller/IANewController';
import { TPOrderan } from '@/server/models/prisma/config';

export interface IControlOrderan extends IAController<"orderan"> {
  // readonly r: InterfaceAbstractRepository<"orderan">;
  //get
  findDashboard( a: string ): Promise<any>;

  findByStatus( id: string ): Promise<any>;
  status( data: TStatusParams, id: string ): Promise<any>;
  //delete
  deleteMany( id: string[] ): Promise<any>;
}

export interface IControlOrderan2 extends IANewController<"orderan", TPOrderan> {
  // readonly r: InterfaceAbstractRepository<"orderan">;
  //get
  findDashboard( a: string ): Promise<any>;

  findByStatus( id: string ): Promise<any>;
  status( data: TStatusParams, id: string ): Promise<any>;
  //delete
  deleteMany( id: string[] ): Promise<any>;
}
