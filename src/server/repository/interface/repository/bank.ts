import { TYPE } from '@/server/models/dataAccess/Bank';

export interface InterfaceBankRepository {
  setOne( d: TYPE ): TYPE;
  setMany( data: TYPE[] ): any[];
  paginate( data: {
    row: number,
    skip: number
  } ): Promise<any>;
  destroy( id: string ): Promise<any>;
  createMany( data: TYPE[] ): Promise<any>;
  destroyMany( id: string ): Promise<any>;
  updateMany( data: TYPE[], id: string ): Promise<any>;
}
