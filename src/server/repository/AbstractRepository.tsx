import { TYPE } from '@/server/models/dataAccess/Bank';
import {
  GetModel, InterfaceAbstractRepository, TEntity
} from '@/server/repository/interface/repository/AbstractRepository';

export abstract class AbstractRepository<T extends TEntity> implements InterfaceAbstractRepository<T> {
  constructor( public prisma: GetModel<T> ) {}

  abstract setOne( d: any ): any;
  abstract setMany( data: any[] ): any[];

  async findAll() {
    // @ts-ignore
    return this.prisma.findMany();
  }
  async findOne( id: string ) {
    // @ts-ignore
    return this.prisma.findFirst( { where: { id } } );
  }

  async findById( id: string ) {
    // @ts-ignore
    return this.prisma.findUnique( { where: { id } } );
  }

  async destroyOne( id: string ) {
    // @ts-ignore
    return this.prisma.delete( { where: { id } } )

  }
//create data from database
  async createOne( data: TYPE ) {
    // @ts-ignore
    return this.prisma.create( { data: this.setOne( data ) } )
  }
//edit data from database
  async updateOne( data: TYPE, id: string ) {
    // @ts-ignore
    return this.prisma.update( {
      where: { id: id }, data: this.setOne( data )
    } )
  }

}