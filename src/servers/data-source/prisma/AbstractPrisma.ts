import { IAbstractPrisma, } from '@/servers/data-source/interface/prisma/IAbstract';
import { GetModelPrisma, TEntity } from '@/servers/data-source/prisma/config';

const test: string = "false"

export abstract class AbstractPrisma<T extends TEntity> implements IAbstractPrisma<T> {
  constructor( public prisma: GetModelPrisma<T> ) {}

  abstract setOne( d: any, ): any;

  abstract setMany( data: any[] | any, method?: string ): any[];

  async findAll() {
    if( test === "true" ) {
      console.info( "prisma find all" )
    }
    // @ts-ignore
    return this.prisma.findMany();
  }

  async findOne( id: string ) {
    if( test === "true" ) {
      console.info( "prisma find one" )
      // console.info( id )
    }
    // @ts-ignore
    return this.prisma.findFirst( { where: { id } } );
  }

  async findById( id: string ) {
    if( test === "true" ) {
      console.info( "prisma find by id" )
      // console.info( id )
    }
    // @ts-ignore
    return this.prisma.findUnique( { where: { id } } );
  }

  async destroyOne( id: string ) {
    if( test === "true" ) {
      console.info( "prisma destroy one" )
      // console.info( id )
    }

    // @ts-ignore
    return this.prisma.delete( { where: { id } } )

  }
//create data from database
  async createOne( data: any, id?: string ) {
    if( test === "true" ) {
      console.info( "prisma create one" )
      // console.info( data )
    }
    // @ts-ignore
    return this.prisma.create( { data: this.setOne( data ) } )
  }
//edit data from database
  async updateOne( data: any, id: string ) {
    if( test === "true" ) {
      console.info( "prisma update one" )
      console.info( data )
    }
    // @ts-ignore
    return this.prisma.update( {
      where: { id: id }, data: this.setOne( data )
    } )
  }

  async paginate( data: {
    row: number,
    skip: number
  } ) {
    const { row, skip } = data
    if( test === "true" ) {
      console.info( "prisma" )
      console.info( data )
    }
    // @ts-ignore
    return this.prisma.findMany( { take: row, skip } )
  }
  // abstract findByStatus( id: string ): Promise<any>
  // abstract findDashboard( a: string ): Promise<any>;
  // abstract destroyMany( a: string[] | string ): Promise<any>;
  // abstract updateMany( data: any, id: string ): Promise<any>

}

