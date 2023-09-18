import { GetModel, InterfaceAbstractRepository, TEntity } from '@/interface/repository/AbstractRepository';

const test: string = "false"

export abstract class ARepository<T extends TEntity> implements InterfaceAbstractRepository<T> {
  constructor( public prisma: GetModel<T> ) {}

  abstract setOne( d: any, ): any;
  abstract setMany( data: any[] | any, method?: string ): any[];

  async findAll() {
    if( test === "true" ) {
      console.info( "prisma" )
    }
    // @ts-ignore
    return this.prisma.findMany();
  }
  async findOne( id: string ) {
    if( test === "true" ) {
      console.info( "prisma" )
      console.info( id )
    }
    // @ts-ignore
    return this.prisma.findFirst( { where: { id } } );
  }

  async findById( id: string ) {
    if( test === "true" ) {
      console.info( "prisma" )
      console.info( id )
    }
    // @ts-ignore
    return this.prisma.findUnique( { where: { id } } );
  }

  async destroyOne( id: string ) {
    if( test === "true" ) {
      console.info( "prisma" )
      console.info( id )
    }
    // @ts-ignore
    return this.prisma.delete( { where: { id } } )

  }
//create data from database
  async createOne( data: any, id?: string ) {
    if( test === "true" ) {
      console.info( "prisma" )
      console.info( data )
    }
    // @ts-ignore
    return this.prisma.create( { data: this.setOne( data ) } )
  }
//edit data from database
  async updateOne( data: any, id: string ) {
    if( test === "true" ) {
      console.info( "prisma" )
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

