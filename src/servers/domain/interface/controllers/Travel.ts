import { TPTravel } from '@/servers/data-source/prisma/config';
import { IValidationService } from '@/lib/validation/zod/validationService';
import { IDeliveryRepo } from '@/servers/data-source/interface/repository/IDeliveryRepo';
import { IAbstractController } from '@/servers/domain/interface/controllers/AbstractController';

export interface IControlTravel extends IAbstractController<"travel", TPTravel> {
  readonly r: IDeliveryRepo
  readonly v: IValidationService<TPTravel>;
}