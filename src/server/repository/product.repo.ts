import { prisma, } from '@/server/models/prisma/config';
import { TProductCreate, TProductUpdate } from "@/entity/product.model";

export default class ProductRepository implements InterfaceRepository {
  paginate(data: { row: number; skip: number; }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  
  search(search: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  
  async findAll(): Promise<any> {
    return prisma.products.findMany();
    
  }
  
  async findById(id: string): Promise<any> {
    return prisma.products.findUnique({ where: { id: id } });
  }
  
  async createOne(data: TProductCreate): Promise<any> {
    return prisma.products.create({ data: { ...data } });
  }
  
  async updateOne(data: TProductUpdate, id: string): Promise<any> {
    return prisma.products.update({ data: { ...data }, where: { id } });
  }
  
  async deleteOne(id: string): Promise<any> {
    return prisma.products.delete({ where: { id } });
  }
  
  setOne(d: (TProductCreate | TProductUpdate) & { id?: string }) {
    return {
      ...(d.id ? { id: d.id, } : {}),
      nama      : d.nama,
      jenis     : d.jenis.replaceAll( " ", "" ),
      lokasi    : d.lokasi.replaceAll( " ", "" ),
      harga     : d.harga || 0,
      keterangan: d.keterangan,
      jumlah    : d.jumlah || 0,
      img       : d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
    }
  }
  
  setMany(data: (TProductCreate | TProductUpdate)[]): any[] {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }
  
  async updateMany(data: (TProductUpdate)[], id: string) {
    return prisma.products.updateMany({
      where: { id: id },
      data : this.setMany( data )
    } )
  }
}

