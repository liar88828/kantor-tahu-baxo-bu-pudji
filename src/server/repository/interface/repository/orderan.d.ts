import { TYPE }   from '@/server/models/dataAccess/Produk';
import { Prisma } from '../../../../../prisma/data';
import {
  Repository
}                 from '@/server/repository/interface/repository/Repository';

export interface InterfaceProduk extends Repository {
  // findAll(): Promise<TYPE[]>;
  // findById( id: string ): Promise<any>;
  // paginate( data: { row: number, skip: number } ): Promise<any>;
  // createOne( data: TYPE ): Promise<any>;
  // createMany( data: TYPE[] ): Promise<Prisma.BatchPayload>;
  // updateOne( data: TYPE, id: string ): Promise<any>;
  // updateMany( data: TYPE[], id: string ): Promise<Prisma.BatchPayload>;
  // destroyOne( id: string ): Promise<any>;
  // destroyMany( id: string ): Promise<Prisma.BatchPayload>;
  // setOne( d: TYPE ): TYPE
  // setMany( d: TYPE[] ): TYPE
}