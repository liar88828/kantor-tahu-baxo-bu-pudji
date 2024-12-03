import { prisma, } from '@/server/models/prisma/config';
import { TDeliveryCreate, TDeliveryUpdate } from "@/entity/travel.model";

// getAll data from database
export default class DeliveryRepository implements InterfaceRepository {
  paginate(data: { row: number; skip: number; }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  
  search(search: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  
  async findAll() {
    return prisma.deliverys.findMany();
  }
  
  async findById(id: string) {
    return prisma.deliverys.findUnique({ where: { id } });
  }
  
  async createOne(data: TDeliveryCreate) {
    return prisma.deliverys.create({ data: { ...data } });
    
  }
  
  async updateOne(data: any, id: string) {
    return prisma.deliverys.update({ data: { ...data }, where: { id } });
    
  }
  
  async deleteOne(id: string) {
    return prisma.deliverys.delete({ where: { id } });
  }
  
  setOne(d: (TDeliveryCreate | TDeliveryUpdate) & { id?: string }) {
    return {
      ...(d.id ? { id: d.id } : {}),
      jenis     : d.jenis,
      harga     : d.harga,
      lokasi    : d.lokasi,
      keterangan: d.keterangan,
      nama      : d.nama,
      hp        : d.hp,
      img       : d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
    }
  }
  
  setMany(data: (TDeliveryCreate | TDeliveryUpdate)[]) {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }
  
  async createMany(data: TDeliveryCreate[]) {
    return prisma.deliverys.createMany({
      data: this.setMany( data )
    } );
  }
  
  async updateMany(data: TDeliveryUpdate[], id: string) {
    return prisma.deliverys.updateMany({
      where: { id: id },
      data : this.setMany( data )
    } )
  }
  
  async deleteMany(id: string) {
    return prisma.deliverys.deleteMany({ where: { id } })
    
  }
  
}
