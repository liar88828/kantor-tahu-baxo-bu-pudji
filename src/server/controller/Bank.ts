import { TPBank } from '@/server/models/prisma/config';
import Controller from '@/server/controller/AController';

type TYPE = TPBank;

export default class BankController2 extends Controller <"bank", TYPE> {
}
