import IAbstractController from '@/servers/interface/controller/AbstractController';
import { TPTravel } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IDeliveryRepo } from '@/servers/interface/repository/IDeliveryRepo';

export interface IControlTravel extends IAbstractController<"travel", TPTravel> {
  readonly r: IDeliveryRepo
  readonly v: IValidationService<TPTravel>;
}