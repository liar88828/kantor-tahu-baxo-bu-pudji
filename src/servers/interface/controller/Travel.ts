import IAbstractController from '@/servers/interface/controller/AbstractController';
import { TPTravel } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IRepoTravel } from '@/servers/data-source/interface/prisma/Travel';

export interface IControlTravel extends IAbstractController<"travel", TPTravel> {
  readonly r: IRepoTravel<TPTravel>
  readonly v: IValidationService<TPTravel>;
}