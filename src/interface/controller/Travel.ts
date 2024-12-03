import InterfaceAbstractController from '@/interface/controller/AbstractController';
import { TPTravel } from '@/server/models/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoTravel } from '@/interface/repository/Travel';

export interface IControlTravel extends InterfaceAbstractController<"travel", TPTravel> {
  readonly r: IRepoTravel<TPTravel>
  readonly v: IValidationService<TPTravel>;
}