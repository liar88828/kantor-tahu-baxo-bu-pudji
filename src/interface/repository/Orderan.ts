import { InterRepository } from '@/interface/repository/Repository';
import { TOrderServer } from '@/entity/server/orderan';

export interface InterfaceOrderan extends Omit<InterRepository<TOrderServer>, "destroyMany" | "setMany" | "updateMany"> {
  updateMany( data: TOrderServer, id: string ): Promise<any>;
  destroyMany( array: string[] ): Promise<any[]>;
  setMany( data: TOrderServer, method: string ): any[];
}