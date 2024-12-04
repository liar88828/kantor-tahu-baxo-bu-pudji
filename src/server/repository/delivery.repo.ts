import { TDeliveryCreate, TDeliverySearch, } from "@/entity/delivery.model";
import {prisma} from "@/lib/prisma";

// getAll data from database
export default class DeliveryRepository implements InterfaceRepository<TDeliveryCreate> {
  paginate(data: { row: number; skip: number; }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  
  search(search: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  
  async findAll(search: TDeliverySearch, page: number = 1, pageSize: number = 100) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const delivery = await prisma.deliverys.findMany(
      {
        skip,
        take,
        where: {
          AND: [
            {
              ...(search.address ? { address: { contains: search.address, } } : {}),
              ...(search.name ? { name: { contains: search.name, } } : {}),
              ...(search.type ? { type: { contains: search.type, } } : {}),
            }
          ],
        }
      }
    );
    return { delivery, page, pageSize };
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
  
  setOne(d: (TDeliveryCreate) & { id?: string }) {
    return {
      // ...(d.id ? { id: d.id } : {}),
      type: d.type,
      price: d.price,
      address: d.address,
      desc: d.desc,
      name: d.name,
      phone: d.phone,
      img       : d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
    }
  }
  
  setMany(data: TDeliveryCreate []) {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }
  
  async createMany(data: TDeliveryCreate[]) {
    return prisma.deliverys.createMany({
      data: this.setMany( data )
    } );
  }
  
  async updateMany(data: TDeliveryCreate[], id: string) {
    return prisma.deliverys.updateMany({
      where: { id },
      data : this.setMany( data )
    } )
  }
  
  async deleteMany(id: string) {
    return prisma.deliverys.deleteMany({ where: { id } })
    
  }
  
}
