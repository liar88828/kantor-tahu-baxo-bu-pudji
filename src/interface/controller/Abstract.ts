import { IValidations } from '@/lib/validation/schema';
import { IService } from '@/lib/validation/validation';

export interface InterController {
  readonly v: IValidations;
  readonly s: IService;
  //find
  find(): Promise<any>;
  findById( id: string ): Promise<any>;
  //create
  create( json: any, id?: string ): Promise<any>;
  //edit
  edit( json: any, id: string ): Promise<any>;
  //delete
  destroy( id: string ): Promise<any>;
}
