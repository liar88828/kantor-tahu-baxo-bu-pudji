// import { InterfaceAbstractRepository } from '@/entity/server/repository/Abstract';
// import { IValidations } from '@/lib/validation/schema';
// import { IService } from '@/lib/validation/validation';
// import { IControlSemuaProduk } from '@/entity/server/controller/SemuaProduk';
//
// class DashboardController implements IControlSemuaProduk {
//   constructor(
//     readonly r: InterfaceAbstractRepository<"semuaProduct">,
//     readonly v: IValidations,
//     readonly s: IService
//   ) {}
//   create( json: any, id?: string ): Promise<any> {
//     return Promise.resolve( undefined );
//   }
//   createText( json: any, id: string ): Promise<any> {
//     return Promise.resolve( undefined );
//   }
//   destroy( id: string ): Promise<any> {
//     return Promise.resolve( undefined );
//   }
//   edit( json: any, id: string ): Promise<any> {
//     return Promise.resolve( undefined );
//   }
//   find(): Promise<any> {
//     return Promise.resolve( undefined );
//   }
//   findById( id: string ): Promise<any> {
//     return Promise.resolve( undefined );
//   }
//
// }