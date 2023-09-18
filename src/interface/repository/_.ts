export interface InterRepository<T> {
  //find
  findAll(): Promise<any[]>;
  findOne( id: string ): Promise<any>;
  findById( id: string ): Promise<any>;
  paginate( data: { row: number, skip: number } ): Promise<any>;
  //create
  createOne( data: T, id?: string ): Promise<any>;
  createMany( data: T[] ): Promise<any>;
  //update
  updateOne( data: T, id: string ): Promise<any>;
  updateMany( data: T[], id: string ): Promise<any>;
  //delete
  destroyOne( id: string ): Promise<any>;
  destroyMany( id: string ): Promise<any>;
  // utils
  setOne( d: any ): any
  setMany( data: [], method: string ): any[];
}
