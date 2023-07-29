import { TYPE }   from '@/server/models/dataAccess/Produk';
import { Prisma } from '../../../../../prisma/data';

export interface InterfaceProduk {
  setData( d: TYPE ): TYPE
  findAll(): Promise<TYPE[]>;
  create( data: TYPE ): Promise<any>;
  findById( id: string ): Promise<any>;
  update( data: TYPE, id: string ): Promise<any>;
  destroy( id: string ): Promise<Prisma.BatchPayload>;
  paginate( data: { row: number, skip: number } ): Promise<any>;
}