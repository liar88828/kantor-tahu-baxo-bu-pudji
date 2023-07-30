import { Repository } from './Repository';
import { Prisma }     from '../../../../../prisma/data';

export class InterfaceSemuaProduk implements Repository {
  createMany( data: any[], id: string ): Promise<Prisma.BatchPayload>;

  createOne( data: any, id: string ): Promise<any>;

  destroyMany( id: string ): Promise<Prisma.BatchPayload>;

  destroyOne( id: string ): Promise<any>;

  findAll(): Promise<any[]>;

  findById( id: string ): Promise<any>;

  findOne( id: string ): Promise<any>;

  paginate( data: { row: number; skip: number } ): Promise<any>;

  setMany( d: any[], id: string ): any[];

  setOne( d: any, id: string ): any;

  updateMany( data: any[], id: string ): Promise<Prisma.BatchPayload>;

  updateOne( data: any, id: string ): Promise<any>;
}

