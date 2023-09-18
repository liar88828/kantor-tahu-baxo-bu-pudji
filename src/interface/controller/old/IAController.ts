import { IValidations } from '@/interface/Service/IValidations';
import { InterfaceAbstractRepository, TEntity } from '@/interface/repository/Abstract';

export interface IAController<T extends TEntity> {
  readonly v: IValidations;
  readonly r: InterfaceAbstractRepository<T>;

  //get
  find(): Promise<any>;
  findById( id: string ): Promise<any>;
  //create
  create( json: any, id?: string ): Promise<any>;
  //put
  edit(
    json: any, id: string ): Promise<any>;
  //delete
  destroy( id: string ): Promise<any>;
}

