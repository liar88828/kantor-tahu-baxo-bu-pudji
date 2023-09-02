export interface InterRepository {
  //find
  findAll(): Promise<any[]>;
  findOne( id: string ): Promise<any>;
  findById( id: string ): Promise<any>;
  paginate( data: { row: number, skip: number } ): Promise<any>;
  //create
  createOne( data: any ): Promise<any>;
  createMany( data: any[] ): Promise<any>;
  //update
  updateOne( data: any, id: string ): Promise<any>;
  updateMany( data: any[], id: string ): Promise<any>;
  //delete
  destroyOne( id: string ): Promise<any>;
  destroyMany( id: string ): Promise<any>;
  // utils
  setOne( d: any ): any
  setMany( data: any, method: string ): any[];
}