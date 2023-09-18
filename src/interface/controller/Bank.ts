import { IAController } from '@/interface/controller/old/IAController';
import IANewController from '@/interface/controller/IANewController';
import { TPBank } from '@/server/models/prisma/config';

export interface IControlBank extends IAController<"bank"> {

}

export interface IControlBank2 extends IANewController<"bank", TPBank> {

}
