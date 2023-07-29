import { TYPE }   from '@/server/models/dataAccess/Travel';
import { Prisma } from '../../../../../prisma/data';

export interface InterfaceRepoTravel {
  setData( d: TYPE ): TYPE
  findAll(): Promise<TYPE[]>;
  findById( id: string ): Promise<any>;
  paginate( data: { row: number, skip: number } ): Promise<any>;
  create( data: TYPE ): Promise<any>;
  update( data: TYPE, id: string ): Promise<Prisma.BatchPayload>;
  destroy( id: string ): Promise<Prisma.BatchPayload>;
}
