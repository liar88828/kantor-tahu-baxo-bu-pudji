import { Repository } from '@/server/repository/interface/repository/Repository';
import { TOrderServer } from '@/entity/server/orderan';

export interface InterfaceOrderan extends Repository {
  // findAll(): Promise<TYPE[]>;
  // findById( id: string ): Promise<any>;
  // paginate( data: { row: number, skip: number } ): Promise<any>;
  // createOne( data: TYPE ): Promise<any>;
  // createMany( data: TYPE[] ): Promise<Prisma.BatchPayload>;
  // updateOne( data: TYPE, id: string ): Promise<any>;
  updateMany( data: TOrderServer, id: string ): Promise<any>;
  // destroyOne( id: string ): Promise<any>;
  destroyMany( id: string[] ): Promise<any[]>;
  // setOne( d: TYPE ): TYPE

  setMany( data: TOrderServer, method: string ): any[];
}