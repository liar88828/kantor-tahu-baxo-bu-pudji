import { PrismaClient } from '../../../../prisma/data';
import type { TYPE } from '@/server/models/dataAccess/Bank';
import { InterRepository } from '@/interface/repository/Repository';

// abstract class Repository

export default class Bank implements InterRepository {
  constructor( private readonly prisma: PrismaClient['bank'] ) {}

  setOne( d: TYPE ): TYPE {
    return {
      id        : d.id,
      jenis     : d.jenis,
      lokasi    : d.lokasi,
      keterangan: d.keterangan,
      nama      : d.nama,
      no        : d.no,
      hp        : d.hp
    }
  }

  setMany( data: TYPE[] ) {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }

  async findAll() {
    return this.prisma.findMany()

  }

//get only one  data from database
  async findById( id: string ) {
    return this.prisma.findUnique( { where: { id } } )
  }

//get only one  data from database
  async findOne( id: string ) {
    return this.prisma.findFirst( { where: { id } } )
  }

//get per page data from database
  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return this.prisma.findMany( { take: row, skip } )
  }

//create data from database
  async createOne( data: TYPE ) {
    return this.prisma.create( { data: this.setOne( data ) } )
  }

//edit data from database
  async updateOne( data: TYPE, id: string ) {
    return this.prisma.update( {
      where: { id: id }, data: this.setOne( data )
    } )
  }

//delete data from database
  async destroy( id: string ) {
    return this.prisma.deleteMany( { where: { id } } )
  }

  async createMany( data: TYPE[] ) {
    return this.prisma.createMany( {
      data: this.setMany( data )
    } );
  }

  async destroyMany( id: string ) {
    return this.prisma.deleteMany( { where: { id } } )

  }

  async destroyOne( id: string ) {
    return this.prisma.delete( { where: { id } } )

  }

  async updateMany( data: TYPE[], id: string ) {
    return this.prisma.updateMany( {
      where: { id: id },
      data : this.setMany( data )
    } )
  }

}
