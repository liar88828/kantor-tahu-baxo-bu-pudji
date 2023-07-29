import {
  Repository
} from '@/server/repository/interface/repository/Repository';

// export interface InterfaceRepoTravel {
//   setData( d: TYPE ): TYPE
//   findAll(): Promise<TYPE[]>;
//   findById( id: string ): Promise<any>;
//   paginate( data: { row: number, skip: number } ): Promise<any>;
//   create( data: TYPE ): Promise<any>;
//   update( data: TYPE, id: string ): Promise<Prisma.BatchPayload>;
//   destroy( id: string ): Promise<Prisma.BatchPayload>;
// }
export interface InterfaceRepoTravel extends Repository {

}