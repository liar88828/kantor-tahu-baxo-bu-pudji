import { InterController } from '@/interface/controller/Abstract';
import { InterfaceAbstractRepository } from '@/interface/repository/Abstract';

export interface IControlOrderan extends InterController {
  readonly r: InterfaceAbstractRepository<"bank">;

}
