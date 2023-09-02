import { InterRepository } from '@/server/repository/interface/repository/Repository';
import { IValidations } from '@/lib/validation/schema';
import { IService } from '@/lib/validation/validation';

export interface InterController {
  readonly r: InterRepository;
  readonly v: IValidations;
  readonly s: IService;
  find(): Promise<any>;
  findById( id: string ): Promise<any>;
  create( json: any ): Promise<any>;
  edit( json: any, id: string ): Promise<any>;
  destroy( id: string ): Promise<any>;
}