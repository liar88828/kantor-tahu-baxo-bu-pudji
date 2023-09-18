import { IAController } from '@/interface/controller/old/IAController';
import IANewController from '@/interface/controller/IANewController';
import { TPProduct } from '@/server/models/prisma/config';

export interface IControlProduct extends IAController<"product"> {
}

export interface IControlProduct2 extends IANewController<"product", TPProduct> {
}