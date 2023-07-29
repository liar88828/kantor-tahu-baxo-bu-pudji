// import { any }   from '@/server/models/dataAccess/Travel';
import { Prisma } from '../../../../../prisma/data';

export interface Repository {
  findAll(): Promise<any[]>;
  findOne( id: string ): Promise<any>;
  findById( id: string ): Promise<any>;
  paginate( data: { row: number, skip: number } ): Promise<any>;
  createOne( data: any ): Promise<any>;
  createMany( data: any[] ): Promise<Prisma.BatchPayload>;
  updateOne( data: any, id: string ): Promise<any>;
  updateMany( data: any[], id: string ): Promise<Prisma.BatchPayload>;
  destroyOne( id: string ): Promise<any>;
  destroyMany( id: string ): Promise<Prisma.BatchPayload>;
  setOne( d: any ): any
  setMany( d: any[] ): any[]
}